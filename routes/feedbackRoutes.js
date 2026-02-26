import express from 'express';
import { requireLogin } from '../middlewares/auth.js';
import {
  getFeedbackPage,
  submitFeedback
} from '../controllers/feedbackController.js';

const router = express.Router();

// Feedback page (protected)
router.get('/feedback', requireLogin, getFeedbackPage);

// Feedback form submission (protected)
router.post('/feedback', requireLogin, submitFeedback);

export default router;