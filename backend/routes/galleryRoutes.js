import express from 'express';
import multer from 'multer';
import { protect, adminOnly } from '../middleware/auth.js';
import {
  uploadImage,
  getAllImages,
  deleteImage
} from '../controllers/galleryController.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.get('/', getAllImages);
router.post('/', protect, adminOnly, upload.single('image'), uploadImage);
router.delete('/:id', protect, adminOnly, deleteImage);

export default router;
