import express from 'express';
import {
  getEvents,
  addEvent,
  updateEvent,
  deleteEvent,
  getUpcomingEvents
} from '../controllers/eventController.js';

import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getEvents);
//router.post('/', protect, adminOnly, addEvent);
router.put('/:id', protect, adminOnly, updateEvent);
router.delete('/:id', protect, adminOnly, deleteEvent);

router.post('/', addEvent);
// GET /api/events/upcoming
router.get('/upcoming', getUpcomingEvents);

export default router;
