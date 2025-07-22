import express from 'express';
import { getAdminDashboardSummary } from '../controllers/dashboardController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

router.get('/admin/summary', protect, adminOnly, getAdminDashboardSummary);

export default router;
