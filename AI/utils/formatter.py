def build_student_context(student_data):
    return f"""
Previous Mood: {student_data.get('previous_mood', 'N/A')}
Current Mood: {student_data.get('current_mood', 'N/A')}
Trend: {student_data.get('trend', 'N/A')}

Situation: {", ".join(student_data.get('situation', []))}

🔹 Text Emotion Analysis:
- Emotion: {student_data.get('text_emotion', 'unknown')}
- Confidence: {student_data.get('text_confidence', 0)}
- Mood Score: {student_data.get('text_score', 0)}

🔹 Image Emotion Analysis:
- Emotion: {student_data.get('image_emotion', 'unknown')}
- Confidence: {student_data.get('image_confidence', 0)}

🔹 Final Emotion:
- Emotion: {student_data.get('final_emotion', 'unknown')}
"""