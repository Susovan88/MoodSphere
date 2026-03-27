#!/bin/bash

echo "🚀 Creating AI_Counselor Project Structure..."

# Main folders
mkdir -p data
mkdir -p models
mkdir -p llm
mkdir -p rag
mkdir -p services
mkdir -p routes
mkdir -p db
mkdir -p utils
mkdir -p research
mkdir -p src
mkdir -p templates

# -----------------------------
# Create main files
# -----------------------------
touch app.py
touch config.py
touch requirements.txt
touch .env

# -----------------------------
# Models
# -----------------------------
touch models/text_emotion.py
touch models/voice_emotion.py
touch models/face_emotion.py

# -----------------------------
# LLM
# -----------------------------
touch llm/gemini_model.py
touch llm/prompts.py

# -----------------------------
# RAG
# -----------------------------
touch rag/retriever.py
touch rag/vector_store.py

# -----------------------------
# Services
# -----------------------------
touch services/session_service.py
touch services/emotion_service.py
touch services/summary_service.py
touch services/blog_service.py
touch services/diary_service.py
touch services/doctor_service.py

# -----------------------------
# Routes
# -----------------------------
touch routes/session_routes.py
touch routes/diary_routes.py
touch routes/blog_routes.py
touch routes/doctor_routes.py

# -----------------------------
# Database
# -----------------------------
touch db/mongo.py
touch db/schemas.py

# -----------------------------
# Utils
# -----------------------------
touch utils/parallel.py
touch utils/formatter.py

# -----------------------------
# Research
# -----------------------------
touch research/trials.ipynb
touch research/analysis.ipynb

# -----------------------------
# Setup
# -----------------------------
touch setup.py

echo "✅ AI_Counselor project structure created successfully!"

