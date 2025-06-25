import Gallery from '../models/Gallery.js';
import fs from 'fs';

export const uploadImage = async (req, res) => {
  const { title } = req.body;
  const imageUrl = `/uploads/${req.file.filename}`;

  const newImage = await Gallery.create({ title, imageUrl });
  res.status(201).json(newImage);
};

export const getAllImages = async (req, res) => {
  const images = await Gallery.find().sort({ uploadedAt: -1 });
  res.json(images);
};

export const deleteImage = async (req, res) => {
  const image = await Gallery.findById(req.params.id);
  if (!image) return res.status(404).json({ message: 'Image not found' });

  const filePath = `./uploads/${image.imageUrl.split('/').pop()}`;
  fs.unlinkSync(filePath);

  await image.deleteOne();
  res.json({ message: 'Deleted successfully' });
};
