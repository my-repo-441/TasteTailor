from google.cloud import vision
from config import Config
import os

# Google Cloud Visionの設定
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = Config.GOOGLE_APPLICATION_CREDENTIALS

def analyze_image(file):
    client = vision.ImageAnnotatorClient()
    
    # 画像をGCP Vision APIで解析
    content = file.read()
    image = vision.Image(content=content)
    response = client.label_detection(image=image)
    
    # ラベルを抽出
    ingredients = [label.description for label in response.label_annotations]
    return ingredients
