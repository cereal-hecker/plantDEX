"""
Primary FastPI ASGI application

"""
from PIL import Image
import numpy as np
import tensorflow as tf
from starlette.responses import RedirectResponse
from fastapi import UploadFile
from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
import uvicorn
from os import listdir


def inference_tflite_np_array(model_path, image_np, target_size=(224, 224)):
    """
    To perform tflite inference on numpy arrays 
    """
    # Load your TFLite model
    interpreter = tf.lite.Interpreter(model_path)
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

    model = "./app/SIH-Models/"
    @app.post("/{name}/predict/")
    async def predict(file: UploadFile, name : str):
        image = Image.open(file.file)
        image = image.resize((224, 224))
        image = np.asarray(image)
        image = image / 255
        var, confidence = inference_tflite_np_array(model + f"{name}/{name.lower()}_mobilenetv2.tflite", image)
        return {"class_id": str(var), "confidence": str(confidence[np.argmax(confidence)])}
    return app


if __name__ == "__main__":
    uvicorn.run(start(), host="localhost", port=8000)


application = start()
