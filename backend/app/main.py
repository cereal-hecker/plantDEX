"""
Primary FastPI ASGI application

"""
from PIL import Image
import numpy as np
import tensorflow as tf
from starlette.responses import RedirectResponse
from fastapi import UploadFile
from fastapi import FastAPI, Body
from starlette.middleware.cors import CORSMiddleware
import uvicorn
from pydantic import BaseModel
from typing import Union
from typing_extensions import Annotated
from langchain.chat_models import ChatOpenAI
from langchain.memory import ChatMessageHistory
from langchain.callbacks import get_openai_callback
from os import environ
from dotenv import load_dotenv

load_dotenv()


class GPTinfo(BaseModel):
    cropName: Union[str, None] = None
    diseaseName: Union[str, None] = None


const = {
    "Wheat",
    "Rice",
    "Corn",
    "Potato",
    "Tomato",
    "Apple"
}

model = "./app/SIH-Models/"

loadModels = {name: tf.lite.Interpreter(
    model + f"{name}/{name.lower()}_mobilenetv2.tflite") for name in const}


class ChatBot:
    def __init__(self, openai_api_key, model):
        self.prompt = """
        write your prompt here-
        """
        self.history = ChatMessageHistory()
        self.chat = ChatOpenAI(openai_api_key=openai_api_key, model=model)
        self.history.add_user_message(self.prompt)

    def start_chat(self, user_input):
        self.history.add_user_message(user_input)

        with get_openai_callback() as cb:
            output = self.chat(self.history.messages).content
        self.history.add_ai_message(output)

        return output


def ChatbotSummary(summary="", diseaseName="Yellow Rust", cropName="Wheat"):
    Prompt = f"Give me solution to {diseaseName} for {cropName}. Make the output less than 250 words, in terms of points, and concise. Give the explanation such that a layman could understand."
    key = environ["API_KEY"]
    chatbot = ChatBot(key, "gpt-3.5-turbo")
    return chatbot.start_chat(Prompt)


def inference_tflite_np_array(name, image_np, target_size=(224, 224)):
    """
    To perform tflite inference on numpy arrays 
    """
    # Load your TFLite model
    interpreter = loadModels[name]
    interpreter.allocate_tensors()

    # Get input and output details
    input_details = interpreter.get_input_details()
    output_details = interpreter.get_output_details()

    # Preprocess your image
    image = tf.image.resize(image_np, target_size)  # Resize if needed
    image = tf.convert_to_tensor(image, dtype=tf.float32)
    image = np.expand_dims(image, axis=0)  # Add batch dimension

    # Preprocess input if necessary (e.g., normalize pixel values)
    image = image / 255.0  # Normalize

    # Set the input tensor
    interpreter.set_tensor(input_details[0]['index'], image)

    # Run inference
    interpreter.invoke()

    output_data = interpreter.get_tensor(output_details[0]['index'])

    predicted_class = np.argmax(output_data[0])
    confidences = output_data[0]

    return predicted_class, confidences


def start():
    app = FastAPI()

    app.add_middleware(
        CORSMiddleware,
        allow_credentials=True,
        allow_headers=['*'],
        allow_methods=['*'],
        allow_origins=['*'],
    )

    @app.get('/')
    def redirect_to_docs():
        return RedirectResponse('/redoc')

    @app.post("/{name}/predict/")
    async def predict(file: UploadFile, name: str):
        image = Image.open(file.file)
        image = image.resize((224, 224))
        image = np.asarray(image)
        image = image / 255
        var, confidence = inference_tflite_np_array(name, image)
        return {"class_id": str(var), "confidence": str(confidence[np.argmax(confidence)])}

    @app.post("/solution/")
    async def solve(items: Annotated[GPTinfo, Body()]
                    ):
        solution = ChatbotSummary("", items.diseaseName, items.cropName)
        # solution = "Nikhil"
        return {"solution": solution}
    return app


application = start()
if __name__ == "__main__":
    uvicorn.run("main:application", host="localhost", port=8000, reload=True)
