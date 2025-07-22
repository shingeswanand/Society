import express from 'express';
import {
  getMyPayments,
  getAllPayments,            
  markPaymentAsRequested,
  adminVerifyPayment,
  createPaymentRecord,
} from '../controllers/maintenancePaymentController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

// Resident fetches their own payments
router.get('/my', protect, getMyPayments);

// Admin fetches all payments
router.get('/', protect, adminOnly, getAllPayments);   

// Resident requests marking as paid
router.put('/:id/request-paid', protect, markPaymentAsRequested);

// Admin verifies payment
router.put('/:id/verify', protect, adminOnly, adminVerifyPayment);

// Admin creates payment
router.post('/', protect, adminOnly, createPaymentRecord);

export default router;
