# Utils Script to TFlite files with Tensorflow 
# ==============================================

import numpy as np 
import tensorflow as tf 

def inference_with_tflite_model(model_path, image_path, target_size=(224, 224)):
    # Load your TFLite model
    interpreter = tf.lite.Interpreter(model_path)
    interpreter.allocate_tensors()

    # Get input and output details
    input_details = interpreter.get_input_details()
    output_details = interpreter.get_output_details()

    # Load and preprocess your image
    image = tf.keras.preprocessing.image.load_img(image_path, target_size=target_size)
    image = tf.keras.preprocessing.image.img_to_array(image)
    image = np.expand_dims(image, axis=0)  # Add batch dimension

    # Preprocess input if necessary (e.g., normalize pixel values)
    image = image / 255.0 # Normalize 

    # Set the input tensor
    interpreter.set_tensor(input_details[0]['index'], image)

    # Run inference
    interpreter.invoke()

    output_data = interpreter.get_tensor(output_details[0]['index'])

    predicted_class = np.argmax(output_data[0])
    confidences = output_data[0]

    return predicted_class , confidences 


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