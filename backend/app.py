from flask import Flask
from flask_cors import CORS
from routes import openai_routes, vision_routes, chatbot_routes, recipe_routes
import logging

logging.basicConfig(level=logging.DEBUG)

def create_app():
    app = Flask(__name__)
    CORS(app, supports_credentials=True)
    
    app.register_blueprint(openai_routes.bp)
    app.register_blueprint(vision_routes.bp)
    app.register_blueprint(chatbot_routes.bp)
    app.register_blueprint(recipe_routes.bp)  # 追加したルート
    
    return app


if __name__ == '__main__':
    app = create_app()
    app.run(host='0.0.0.0', port=5001, debug=True)