import json
from flask import Blueprint, request, jsonify
import logging

# ログレベルを設定
logging.basicConfig(level=logging.DEBUG)

bp = Blueprint('recipes', __name__, url_prefix='/api')
RECIPES_FILE = 'recipes.json'
        
# ファイルからデータを読み込む関数
def load_data(file_path):
    try:
        with open(file_path, 'r') as file:
            return json.load(file)
    except (FileNotFoundError, json.JSONDecodeError):
        return []

# ファイルにデータを書き込む関数
def save_data(file_path, data):
    with open(file_path, 'w') as file:
        json.dump(data, file, ensure_ascii=False, indent=4)

# レシピデータを取得
@bp.route('/recipes', methods=['GET'])
def get_recipes():
    recipes = load_data(RECIPES_FILE)
    return jsonify(recipes), 200

# レシピデータを保存
@bp.route('/recipes', methods=['POST'])
def save_recipes():
    try:
        data = request.json
        recipes = data.get("recipes", [])
        if not isinstance(recipes, list):
            return jsonify({"error": "Invalid format for recipes"}), 400
        print(recipes)
        save_data(RECIPES_FILE, recipes)  # ファイルに保存
        return jsonify({"message": "Recipes saved successfully"}), 200
    except Exception as e:
        return jsonify({"error": f"Server error: {str(e)}"}), 500
