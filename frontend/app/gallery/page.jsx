'use client';

import { useEffect, useState } from 'react';
import axios from '@/utils/axiosInstance';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

export default function GalleryPage() {
  const [albums, setAlbums] = useState([]);
  const [activeAlbum, setActiveAlbum] = useState(null);
  const [photoIndex, setPhotoIndex] = useState(0);

  // Load albums
  useEffect(() => {
    axios
      .get('/gallery')
      .then(res => setAlbums(res.data))
      .catch(err => console.error(err));
  }, []);

  // Preload images when albums are loaded
  useEffect(() => {
    albums.forEach(album => {
      album.images.forEach(img => {
        const preload = new Image();
        preload.src = `http://localhost:5000${img.imageUrl}`;
      });
    });
  }, [albums]);

  return (

    <>
    <section
        className="relative h-72 bg-center bg-cover flex items-center justify-center text-white"
        style={{ backgroundImage: "url('/header.jpg')" }}
      >
        <div className="absolute inset-0 bg-opacity-50"></div>
        <h1 className="relative text-3xl md:text-4xl font-bold">
          Gallery
        </h1>
      </section>
    <div className="p-6">
      
      {/* <h1 className="text-2xl font-bold mb-6">Society Photo Gallery</h1> */}

      {albums.length === 0 ? (
        <p>No albums found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {albums.map(album => (
            <div
              key={album._id}
              className="cursor-pointer bg-white rounded shadow hover:shadow-lg transition"
              onClick={() => {
                setActiveAlbum(album);
                setPhotoIndex(0);
              }}
            >
              <img
                src={`http://localhost:5000${album.images[0]?.imageUrl}`}
                alt={album.title}
                className="w-full h-48 object-cover rounded-t"
                loading="lazy"
              />
              <div className="p-2 text-center font-semibold">{album.title}</div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {activeAlbum && (
        <Lightbox
          mainSrc={`http://localhost:5000${activeAlbum.images[photoIndex].imageUrl}`}
          nextSrc={`http://localhost:5000${activeAlbum.images[(photoIndex + 1) % activeAlbum.images.length].imageUrl}`}
          prevSrc={`http://localhost:5000${activeAlbum.images[(photoIndex + activeAlbum.images.length - 1) % activeAlbum.images.length].imageUrl}`}
          onCloseRequest={() => setActiveAlbum(null)}
          onMovePrevRequest={() =>
            setPhotoIndex(
              (photoIndex + activeAlbum.images.length - 1) % activeAlbum.images.length
            )
          }
          onMoveNextRequest={() =>
            setPhotoIndex((photoIndex + 1) % activeAlbum.images.length)
          }
          imageTitle={`${activeAlbum.title} (${photoIndex + 1}/${activeAlbum.images.length})`}
        />
      )}
    </div>
    </>
  );
}
