import express from 'express';
import { protect, adminOnly } from '../middleware/auth.js';
import {
  addVisitor,
  getVisitorsByFlat,
  getAllVisitors,
} from '../controllers/visitorController.js';

const router = express.Router();

router.post('/', protect, addVisitor); // Resident logs visitor
router.get('/my-flat', protect, getVisitorsByFlat); // Resident view own
router.get('/admin/all', protect, adminOnly, getAllVisitors); // Admin view all

export default router;
