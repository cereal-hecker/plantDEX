"""
Primary FastPI ASGI application

"""
from PIL import Image
import numpy as np
from keras.models import load_model
from starlette.responses import RedirectResponse
from fastapi import UploadFile
from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
import uvicorn

model = load_model("model.h5")


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
    return app


if __name__ == "__main__":
    uvicorn.run(start(), host="localhost", port=8000)


application = start()
