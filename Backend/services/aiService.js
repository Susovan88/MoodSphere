// services/aiService.js

import axios from "axios";

const ML_API_CANDIDATES = [
  process.env.ML_API_URL,
  process.env.ML_API,
  "http://127.0.0.1:8000",
]
  .filter((value, index, arr) => Boolean(value) && arr.indexOf(value) === index)
  .map((base) => String(base).replace(/\/$/, ""));

const CHAT_API_CANDIDATES = [
  process.env.AI_CHAT_API_URL,
  "http://127.0.0.1:6000/api/chat",
  "http://127.0.0.1:5000/api/chat",
]
  .filter((value, index, arr) => Boolean(value) && arr.indexOf(value) === index)
  .map((url) => String(url));

const fallbackReplyByEmotion = (emotion) => {
  const label = String(emotion || "neutral").toLowerCase();
  if (["negative", "sad", "angry", "fear", "very_negative", "stressed"].includes(label)) {
    return "I hear that this feels difficult right now. Thank you for sharing honestly.";
  }
  if (["positive", "happy", "hopeful", "very_positive"].includes(label)) {
    return "That sounds like a positive emotional state. Keep noticing what supports you.";
  }
  return "Thank you for sharing. I am tracking your emotional state right now.";
};

const postFirstSuccess = async (urls, body, timeout = 10000) => {
  let lastError;
  for (const url of urls) {
    try {
      const response = await axios.post(url, body, { timeout });
      return response;
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError || new Error("All upstream requests failed");
};

export const getFinalAIResponse = async ({ message, studentData }) => {
  try {
    // 🔹 1. Call Emotion Detection API
    const emotionUrls = ML_API_CANDIDATES.map((base) => `${base}/predict`);
    const emotionRes = await postFirstSuccess(emotionUrls, { text: message });

    const emotionData = emotionRes.data[0];

    // Extract values
    const detectedEmotion = emotionData.prediction;
    const confidence = emotionData.confidence;

    // 🔹 2. Call Chat API with enhanced data
    const chatRes = await postFirstSuccess(
      CHAT_API_CANDIDATES,
      {
        student_data: {
          ...studentData,
          detected_emotion: detectedEmotion,
          confidence: confidence,
        },
        message,
      },
      15000
    );

    let aiResponse = chatRes.data.data.response;

    // 🔥 3. Clean LLM JSON (remove ```json block)
    if (aiResponse.includes("```")) {
      aiResponse = aiResponse
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();
    }

    let parsed;
    try {
      parsed = JSON.parse(aiResponse);
    } catch (err) {
      parsed = {
        emotion: detectedEmotion,
        risk_level: "unknown",
        response: aiResponse,
        action: "none",
      };
    }

    // 🔥 4. Final Combined Output
    return {
      success: true,
      data: {
        finalEmotion: parsed.emotion || detectedEmotion,
        confidence,
        riskLevel: parsed.risk_level,
        reply: parsed.response,
        action: parsed.action,

        // Debug / analytics
        modelEmotion: detectedEmotion,
        studentContext: chatRes.data.data.student_context,
      },
    };

  } catch (error) {
    const errorMessage = error?.response?.data?.error || error?.message || "AI processing failed";
    console.error("AI Service Error:", errorMessage);

    return {
      success: true,
      data: {
        finalEmotion: "neutral",
        confidence: 0,
        riskLevel: "unknown",
        reply: fallbackReplyByEmotion("neutral"),
        action: "none",
        modelEmotion: "neutral",
        studentContext: studentData || {},
      },
      degraded: true,
      message: errorMessage,
    };
  }
};