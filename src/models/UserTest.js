// src/models/UserTest.js
import mongoose from "mongoose";

const userTestSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ["DSA", "DBMS", "OOPS", "CN", "OS", "Web Development", "System Design", "Algorithms"]
  },
  difficulty: {
    type: String,
    required: true,
    enum: ["Very Easy", "Easy", "Medium", "Hard", "Very Hard"]
  },
  score: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  totalQuestions: {
    type: Number,
    required: true,
    min: 1
  },
  correctAnswers: {
    type: Number,
    required: true,
    min: 0
  },
  attemptedQuestions: [{
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
      required: true
    },
    userAnswer: {
      type: String,
      required: true
    },
    isCorrect: {
      type: Boolean,
      required: true
    },
    timeSpent: {
      type: Number, // in seconds
      default: 0
    }
  }],
  timeSpent: {
    type: Number, // total time in seconds
    required: true,
    min: 0
  },
  completedAt: {
    type: Date,
    default: Date.now
  },
  testSessionId: {
    type: String,
    unique: true,
    sparse: true // allows null values but ensures uniqueness when present
  }
}, {
  timestamps: true
});

// Index for efficient querying
userTestSchema.index({ userId: 1, completedAt: -1 });
userTestSchema.index({ userId: 1, category: 1, difficulty: 1 });

// Virtual for percentage score
userTestSchema.virtual('percentageScore').get(function() {
  return Math.round((this.correctAnswers / this.totalQuestions) * 100);
});

// Ensure virtual fields are serialized
userTestSchema.set('toJSON', { virtuals: true });

export default mongoose.model("UserTest", userTestSchema);
