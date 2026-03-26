from pymongo import MongoClient
import os

client = MongoClient(os.getenv("MONGO_URI"))
db = client["ai_db"]

def get_student(student_id):
    return db.students.find_one({"_id": student_id})