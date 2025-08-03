// models/Gallery.js
import mongoose from 'mongoose';

const galleryAlbumSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  images: [
    {
      imageUrl: String,
      filename: String,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const GalleryAlbum = mongoose.model('GalleryAlbum', galleryAlbumSchema);
export default GalleryAlbum;
