import express from 'express';
import multer from 'multer';
import { protect, adminOnly } from '../middleware/auth.js';
import {
  createGalleryAlbum,
  getAllAlbums,
  deleteAlbum,
} from '../controllers/galleryController.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Get all albums
router.get('/', getAllAlbums);

// Create an album with multiple images
router.post('/', protect, adminOnly, upload.array('images'), createGalleryAlbum);

// Delete an album
router.delete('/:id', protect, adminOnly, deleteAlbum);

export default router;
