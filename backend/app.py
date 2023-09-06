from fastapi import FastAPI, UploadFile
import tensorflow as tf
import numpy as np
from PIL import Image
import uvicorn

app = FastAPI()

model = tf.keras.models.load_model("model.h5")


@app.get("/")
async def api():
    return {"response": "Welcome!"}


@app.post("/predict/")
async def predict(file: UploadFile):
    image = Image.open(file.file)
    image = image.resize((224, 224))
    image = np.asarray(image)
    image = image / 255
    predictions = model.predict(np.array([image]))
    var = np.argmax(predictions)
    confidence = predictions[0][var]
    return {"class_id": str(var), "confidence": str(confidence)}

if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=8000)
