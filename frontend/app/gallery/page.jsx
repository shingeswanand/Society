'use client';

import { useEffect, useState } from 'react';
import axios from '@/utils/axiosInstance';

export default function GalleryPage() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios.get('/gallery')
      .then(res => setImages(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Society Photo Gallery</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {images.map(img => (
          <div key={img._id} className="bg-white rounded shadow">
            <img src={img.imageUrl} alt={img.title} className="w-full h-48 object-cover rounded-t" />
            <div className="p-2 text-center font-semibold">{img.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
