from flask import Blueprint, request, jsonify
from services.vision_service import analyze_image

bp = Blueprint('vision', __name__, url_prefix='/api/process-image')

@bp.route('', methods=['POST'])
def process_image_route():
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No file uploaded'}), 400
        
        file = request.files['file']
        ingredients = analyze_image(file)
        return jsonify({'ingredients': ingredients})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
