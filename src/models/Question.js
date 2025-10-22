// src/models/Question.js
import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
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
  type: {
    type: String,
    required: true,
    enum: ["MCQ"],
    default: "MCQ"
  },
  questionText: {
    type: String,
    required: true,
    trim: true
  },
  options: {
    type: [String],
    required: true,
    validate: {
      validator: function(options) {
        return options.length === 4;
      },
      message: "Question must have exactly 4 options"
    }
  },
  correctAnswer: {
    type: String,
    required: true,
    validate: {
      validator: function(answer) {
        return this.options.includes(answer);
      },
      message: "Correct answer must be one of the provided options"
    }
  },
  solutionExplanation: {
    type: String,
    required: true,
    trim: true
  },
  timer: {
    type: Number,
    default: 60, // seconds per question
    min: 10,
    max: 300
  },
  tags: {
    type: [String],
    default: []
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for efficient querying
questionSchema.index({ category: 1, difficulty: 1, isActive: 1 });

export default mongoose.model("Question", questionSchema);
