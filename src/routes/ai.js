import express from 'express';
import {
  getAIHealth,
  analyzeJobMatch,
  optimizeResume,
  generateCoverLetter,
  prepareInterview,
  analyzeCareerPath,
  createApplicationStrategy,
  getMarketIntelligence,
  createLearningPlan,
  getNetworkingInsights,
  analyzeApplicationPerformance
} from '../controllers/aiController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// AI Health Check
router.get('/health', getAIHealth);

// Smart Job Matching & Scoring
router.post('/analyze-job-match', auth, analyzeJobMatch);

// Resume Optimization
router.post('/optimize-resume', auth, optimizeResume);

// Cover Letter Generation
router.post('/generate-cover-letter', auth, generateCoverLetter);

// Interview Preparation
router.post('/prepare-interview', auth, prepareInterview);

// Career Path Intelligence
router.post('/analyze-career-path', auth, analyzeCareerPath);

// Application Strategy
router.post('/create-application-strategy', auth, createApplicationStrategy);

// Market Intelligence
router.post('/market-intelligence', auth, getMarketIntelligence);

// Personalized Learning
router.post('/create-learning-plan', auth, createLearningPlan);

// Networking Intelligence
router.post('/networking-insights', auth, getNetworkingInsights);

// Application Analytics
router.post('/analyze-application-performance', auth, analyzeApplicationPerformance);

export default router;