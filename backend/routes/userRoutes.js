import express from 'express';
import { loginUser, registerUser } from '../controllers/userController.js';
//import { getAllUsers } from '../controllers/userController.js';
import { protect, adminOnly } from '../middleware/auth.js';

import {
  getAllUsers,
  updateUserRole,
  deleteUser
} from '../controllers/userController.js';

const router = express.Router();
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/', protect, adminOnly, getAllUsers);
router.put('/:id/role', protect, adminOnly, updateUserRole);
router.delete('/:id', protect, adminOnly, deleteUser);
export default router;
