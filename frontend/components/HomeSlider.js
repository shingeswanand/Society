'use client';

import { useEffect, useState } from 'react';

const slides = [
  {
    image:
      '/banner-2.jpg',
    title: 'Big Challenges. Bigger Opportunities.',
    subtitle:
      'We move with you through your digital transformation journey.',
    buttons: [
      { label: 'Contact Us', link: '/contact' },
      
    ],
  },
 
  {
    image:
      '/banner-3.jpg',
    title: 'AI-Powered Innovation.',
    subtitle: 'Turn data into decisions with intelligent automation.',
    buttons: [
      { label: 'Gallery', link: '/gallery' },
    
    ],
  },
];

export default function CalsoftSlider() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prev = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  useEffect(() => {
    const interval = setInterval(next, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden font-sans">
      {slides[current] && (
        <>
          {/* Background Image */}
          <img
            src={slides[current].image}
            alt="Slide Background"
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out z-0"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40 z-20 flex flex-col justify-center px-6 md:px-20 text-white transition-opacity duration-1000">
            <div className="max-w-2xl space-y-6">
              <h1 className="text-2xl md:text-5xl font-medium leading-tight">
                {slides[current].title}
              </h1>
              <p className="text-lg md:text-xl">{slides[current].subtitle}</p>
              <div className="flex space-x-4">
                {slides[current].buttons.map((btn, i) => (
                  <a
                    key={i}
                    href={btn.link}
                    className={`px-6 py-2 rounded transition ${
                      i === 0
                        ? 'border border-red-800 rounded-full hover:bg-white hover:text-black text-white'
                        : 'bg-red-950 text-white hover:bg-white-200 hover:border-red-100'
                    }`}
                  >
                    {btn.label} →
                  </a>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Navigation Arrows */}
      <div className="absolute bottom-4 right-4 flex space-x-2 z-30">
        <button
          onClick={prev}
          className="bg-black/60 hover:bg-white hover:text-black text-white w-10 h-10 flex items-center justify-center rounded-full transition"
        >
          ←
        </button>
        <button
          onClick={next}
          className="bg-black/60 hover:bg-white hover:text-black text-white w-10 h-10 flex items-center justify-center rounded-full transition"
        >
          →
        </button>
      </div>
    </section>
  );
}
