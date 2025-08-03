import express from 'express';
import {
  submitRequest,
  getMyRequests,
  getAllRequests,
  updateRequestStatus,
} from '../controllers/maintenanceController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

// Resident submits a new request
router.post('/', protect, submitRequest);

// Resident views own requests
router.get('/', protect, getMyRequests);

// Admin views all requests
router.get('/admin/all', protect, adminOnly, getAllRequests);

// Admin updates status
router.put('/:id', protect, adminOnly, updateRequestStatus);

export default router;
