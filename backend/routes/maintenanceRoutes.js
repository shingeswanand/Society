import express from 'express';
import {
  submitRequest,
  getMyRequests,
  getAllRequests,
  updateRequestStatus,
} from '../controllers/maintenanceController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

router.post('/', protect, submitRequest);
router.get('/', protect, getMyRequests);
router.get('/admin/all', protect, adminOnly, getAllRequests);
router.put('/:id', protect, adminOnly, updateRequestStatus);

export default router; // ✅ THIS IS REQUIRED
