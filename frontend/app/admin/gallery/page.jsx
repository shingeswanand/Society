'use client';

import { useEffect, useState } from 'react';
import axios from '@/utils/axiosInstance';
import withAuth from '@/utils/withAuth';

function AdminGalleryPage() {
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState('');
  const [album, setAlbum] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const loadImages = async () => {
    try {
      const res = await axios.get('/gallery');
      setImages(res.data);
    } catch (err) {
      console.error('Failed to load images', err);
      setError('Failed to load images');
    }
  };

  useEffect(() => {
    loadImages();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!title || !album || !file || file.length === 0) {
      setError('Please enter title, album, and select at least one image.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('album', album);

    Array.from(file).forEach((f) => {
      formData.append('images', f);
    });

    try {
      await axios.post('/gallery', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setSuccess('Images uploaded successfully!');
      setTitle('');
      setAlbum('');
      setFile(null);
      loadImages();
    } catch (err) {
      console.error(err);
      setError('Upload failed');
    }
  };

  const deleteImage = async (id) => {
    try {
      await axios.delete(`/gallery/${id}`);
      loadImages();
    } catch (err) {
      console.error('Delete failed', err);
      setError('Delete failed');
    }
  };

  // Group images by album
  const albums = images.reduce((acc, img) => {
    if (!acc[img.album]) acc[img.album] = [];
    acc[img.album].push(img);
    return acc;
  }, {});

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      <h1 className="text-xl font-bold">Gallery Management</h1>

      {error && <p className="text-red-600">{error}</p>}
      {success && <p className="text-green-600">{success}</p>}

      {/* Upload Form */}
      <form onSubmit={handleUpload} className="space-y-2">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Image title"
          className="border px-3 py-2 rounded w-full"
        />
        <input
          type="text"
          value={album}
          onChange={(e) => setAlbum(e.target.value)}
          placeholder="Album name (e.g., Diwali 2024)"
          className="border px-3 py-2 rounded w-full"
        />
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => setFile(e.target.files)}
          className="border px-3 py-2 rounded w-full"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Upload
        </button>
      </form>

      {/* Albums */}
      {Object.keys(albums).length === 0 ? (
        <p>No images uploaded.</p>
      ) : (
        <div className="space-y-8">
          {Object.keys(albums).map((albumName) => (
            <div key={albumName}>
              <h2 className="text-lg font-semibold mb-3">{albumName}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {albums[albumName].map((img) => (
                  <div
                    key={img._id}
                    className="relative bg-white shadow rounded overflow-hidden"
                  >
                    <img
  src={
    img.imageUrl
      ? `http://localhost:5000/uploads${img.imageUrl.startsWith('/') ? img.imageUrl : '/' + img.imageUrl}`
      : 'https://placehold.co/400x300?text=No+Image'
  }
  alt={img.title}
  className="w-full h-48 object-cover"
/>

                    <div className="p-2">{img.title}</div>
                    <button
                      onClick={() => deleteImage(img._id)}
                      className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default withAuth(AdminGalleryPage, { adminOnly: true });
