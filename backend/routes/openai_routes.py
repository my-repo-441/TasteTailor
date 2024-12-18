from flask import Blueprint, request, jsonify
from services.openai_service import generate_recipe_and_image

bp = Blueprint('openai', __name__, url_prefix='/api/openai')

@bp.route('', methods=['POST'])
# def generate_recipe_route():
#     try:
#         data = request.get_json()
#         if 'ingredients' not in data:
#             return jsonify({"error": "Ingredients are required"}), 400
        
#         ingredients = data['ingredients']
#         recipe = generate_recipe(ingredients)
#         return jsonify({"recipe": recipe})
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

@bp.route('', methods=['POST'])
def generate_recipe_route():
    try:
        data = request.get_json()
        if 'ingredients' not in data:
            return jsonify({"error": "Ingredients are required"}), 400
        
        ingredients = data['ingredients']
        result = generate_recipe_and_image(ingredients)  # レシピと画像URLを取得

        return jsonify(result)

    except Exception as e:
        return jsonify({"error": str(e)}), 500
