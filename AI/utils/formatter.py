
def build_student_context(student_data):
    return f"""
Previous Mood: {student_data['previous_mood']}
Current Mood: {student_data['current_mood']}
Trend: {student_data['trend']}

Situation: {", ".join(student_data['situation'])}
"""