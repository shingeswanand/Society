import express from 'express';
import { getAdminSummary } from '../controllers/adminController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

router.get('/summary', protect, adminOnly, getAdminSummary);

export default router;
