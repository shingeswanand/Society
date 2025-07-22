import GalleryAlbum from '../models/Gallery.js';
import fs from 'fs';

export const createGalleryAlbum = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded.' });
    }

    const { title } = req.body;

    const album = new GalleryAlbum({
      title,
      images: req.files.map((file) => ({
        imageUrl: `/uploads/${file.filename}`,
        filename: file.filename,
      })),
    });

    await album.save();
    res.status(201).json(album);
  } catch (err) {
    console.error('Upload error', err);
    res.status(500).json({ message: 'Upload failed.' });
  }
};

export const getAllAlbums = async (req, res) => {
  const albums = await GalleryAlbum.find().sort({ createdAt: -1 });
  res.json(albums);
};

export const deleteAlbum = async (req, res) => {
  try {
    const { id } = req.params;
    const album = await GalleryAlbum.findById(id);
    if (!album) return res.status(404).json({ message: 'Album not found' });

    // Delete files
    for (const img of album.images) {
      if (img.filename) {
        try {
          fs.unlinkSync(`uploads/${img.filename}`);
        } catch (err) {
          console.warn(`Failed to delete file ${img.filename}: ${err.message}`);
        }
      }
    }

    await album.deleteOne();
    res.json({ message: 'Album deleted' });
  } catch (err) {
    console.error('Delete error', err);
    res.status(500).json({ message: 'Server error' });
  }
};
