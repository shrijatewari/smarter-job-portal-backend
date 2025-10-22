// src/routes/testRoutes.js
import express from "express";
import auth from "../middleware/auth.js";
import {
  getQuestions,
  submitTest,
  getUserTestHistory,
  getTestResult,
  getUserTestStats
} from "../controllers/test.controller.js";

const router = express.Router();

// Get questions for a test (public endpoint for test taking)
router.get("/questions", getQuestions);

// Submit test results (requires authentication)
router.post("/submit", auth, submitTest);

// Get user's test history (requires authentication)
router.get("/history/:userId", auth, getUserTestHistory);

// Get detailed test result (requires authentication)
router.get("/result/:testId", auth, getTestResult);

// Get user's test statistics (requires authentication)
router.get("/stats/:userId", auth, getUserTestStats);

export default router;
