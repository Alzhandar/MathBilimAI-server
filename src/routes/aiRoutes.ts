import express from 'express';

import { saveTestResult, getUserTestResults, analyzeTestResults } from '../controllers/testResultController';
import authMiddleware from '../middleware/authMiddleware';
import { Router } from 'express';
import { generateTestHandler, chatWithAIHandler, submitTestHandler } from '../controllers/aiController';
import { uploadTaskRouter } from '../controllers/uploadTaskController';


const router = Router();
uploadTaskRouter(router); 
router.post('/generate-test', generateTestHandler);
router.post('/chat', chatWithAIHandler);
router.post('/submit-test', submitTestHandler);
router.post('/save-test-result', authMiddleware, saveTestResult);
router.get('/user/:userId/test-results', authMiddleware, getUserTestResults);
router.get('/user/:userId/analyze-test-results', authMiddleware, analyzeTestResults);
export default router;
