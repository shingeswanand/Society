import express from 'express';
import {
  getEvents,
  addEvent,
  updateEvent,
  deleteEvent,
  registerForEvent,
  getUpcomingEvents,
} from '../controllers/eventController.js';

import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getEvents);
router.get('/upcoming', getUpcomingEvents);
router.post('/:id/register', protect, registerForEvent);

// Admin routes
router.post('/', protect, adminOnly, addEvent);
router.put('/:id', protect, adminOnly, updateEvent);
router.delete('/:id', protect, adminOnly, deleteEvent);

export default router;
