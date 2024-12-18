from flask import Blueprint, request, jsonify
from openai import OpenAI
from config import Config

bp = Blueprint('chatbot', __name__, url_prefix='/api/chatbot')
client = OpenAI()
OPENAI_API_KEY = Config.OPENAI_API_KEY

# 会話履歴を保持する変数
conversation_history = []

@bp.route('', methods=['POST'])
def chatbot():
    global conversation_history

    # フロントエンドからのリクエストデータを取得
    user_message = request.json.get('message', '')
    if not user_message:
        return jsonify({"error": "Message is required"}), 400

    # 会話履歴を更新
    conversation_history.append({"role": "user", "content": user_message})

    # OpenAI APIにリクエストを送信
    try:
        response = client.chat.completions.create(
            model="gpt-4",
            messages=conversation_history,
            max_tokens=1000
        )
        bot_reply = response.choices[0].message.content.strip()
        conversation_history.append({"role": "assistant", "content": bot_reply})
        
        print(conversation_history)

        return jsonify({"reply": bot_reply})

    except Exception as e:
        return jsonify({"error": str(e)}), 500
