import mongoose from "mongoose";
import Student from "./models/Student.js";
import dotenv from "dotenv";

dotenv.config();

// 🔗 Connect DB
await mongoose.connect(process.env.MONGO_URI);
console.log("✅ DB Connected");

// 🎯 CONFIG
const STUDENT_ID = "69c53942a600649a24811587"; 

// 🎲 Random generator
const getRandomScore = () => {
  return (Math.random() * 2 - 1).toFixed(2); // -1 to +1
};

// 😊 Emotion logic
const getEmotion = (score) => {
  if (score > 0.3) return "happy";
  if (score < -0.3) return "sad";
  return "neutral";
};

// 🚨 Risk logic
const getRisk = (score) => {
  if (score < -0.5) return "high";
  if (score < -0.2) return "medium";
  return "low";
};

const run = async () => {
  try {
    const student = await Student.findById(STUDENT_ID);

    if (!student) {
      console.log("❌ Student not found");
      process.exit();
    }

    let moodHistory = [];

    // 📅 Generate last 30 days data
    for (let i = 0; i < 30; i++) {
      const textScore = parseFloat(getRandomScore());
      const voiceScore = parseFloat(getRandomScore());
      const faceScore = parseFloat(getRandomScore());

      // ⚖️ Final Score
      const finalScore =
        0.6 * textScore + 0.2 * voiceScore + 0.2 * faceScore;

      const emotion = getEmotion(finalScore);

      // 📆 Date (past 30 days)
      const date = new Date();
      date.setDate(date.getDate() - i);

      moodHistory.push({
        textScore,
        voiceScore,
        faceScore,
        finalScore,
        emotion,
        date,
      });
    }

    // 📊 Calculate Average
    const avg =
      moodHistory.reduce((sum, m) => sum + m.finalScore, 0) /
      moodHistory.length;

    // 🎯 Final Mood
    let currentMood = "neutral";
    if (avg > 0.2) currentMood = "positive";
    else if (avg < -0.2) currentMood = "negative";

    const riskLevel = getRisk(avg);

    // 💾 Save to DB
    student.moodHistory = moodHistory.reverse(); // oldest → newest
    student.currentMood = currentMood;
    student.moodScore = avg;
    student.riskLevel = riskLevel;
    student.lastActive = new Date();

    await student.save();

    console.log("✅ Dummy data inserted successfully!");
    console.log({
      avgScore: avg.toFixed(2),
      currentMood,
      riskLevel,
    });

    process.exit();

  } catch (err) {
    console.error("❌ Error:", err.message);
    process.exit();
  }
};

run();