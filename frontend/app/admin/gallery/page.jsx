'use client';

import { useEffect, useState } from 'react';
import axios from '@/utils/axiosInstance';
import withAuth from '@/utils/withAuth';

function AdminGalleryPage() {
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);

  const loadImages = async () => {
    const res = await axios.get('/gallery');
    setImages(res.data);
  };

  useEffect(() => {
    loadImages();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!title || !file) return alert('Title and image required');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('image', file);

    await axios.post('/gallery', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });

    setTitle('');
    setFile(null);
    loadImages();
  };

  const deleteImage = async (id) => {
    await axios.delete(`/gallery/${id}`);
    loadImages();
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-xl font-bold">Gallery Management</h1>

      <form onSubmit={handleUpload} className="space-y-2">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Image title"
          className="border px-3 py-2 rounded w-full"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          className="border px-3 py-2 rounded w-full"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Upload
        </button>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {images.map(img => (
          <div key={img._id} className="relative bg-white shadow rounded overflow-hidden">
            <img src={img.imageUrl} className="w-full h-48 object-cover" />
            <div className="p-2">{img.title}</div>
            <button
              onClick={() => deleteImage(img._id)}
              className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full"
            >✕</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default withAuth(AdminGalleryPage, { adminOnly: true });
