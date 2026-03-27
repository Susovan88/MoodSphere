from flask import Blueprint, request, jsonify
from services.session_service import get_ai_response
from utils.formatter import build_student_context
from db.mongo import get_student

chat_bp = Blueprint("chat", __name__)

@chat_bp.route("/chat", methods=["POST"])
def chat():
    try:
        data = request.json

        student_id = data.get("student_id")
        message = data.get("message")

        student = get_student(student_id)

        # 🔁 Dummy fallback
        student_data = {
            "previous_mood": 0.6,
            "current_mood": 0.3,
            "trend": "decreasing",
            "situation": ["exam", "family issues"]
        }

        context = build_student_context(student_data)

        response = get_ai_response(context, message)

        return jsonify({
            "success": True,
            "data": response
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500