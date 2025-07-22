import express from 'express';
import { protect } from '../middleware/auth.js';
import {
  createFeedback,
  getMyFeedback,
  getAllFeedback
} from '../controllers/feedbackController.js';

const router = express.Router();

// Resident: create feedback
router.post('/', protect, createFeedback);

// Resident: get own feedback
router.get('/my', protect, getMyFeedback);

// Admin: get all feedback
router.get('/', protect, getAllFeedback);

export default router;
