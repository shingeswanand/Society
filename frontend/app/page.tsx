"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import moment from "moment";
import axios from "@/utils/axiosInstance";
import HomeSlider from "../components/HomeSlider";

type EventType = {
  _id: string;
  name: string;
  date: string;
  description: string;
};

type GalleryImage = {
  _id: string;
  title: string;
  imageUrl: string;
};

export default function Home() {
  const [latestEvents, setLatestEvents] = useState<EventType[]>([]);
  const [latestGalleryImages, setLatestGalleryImages] = useState<
    GalleryImage[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventRes, galleryRes] = await Promise.all([
          axios.get<EventType[]>("/events/upcoming"),
          axios.get<any[]>("/gallery"),
        ]);

        setLatestEvents(eventRes.data.slice(0, 3));

        const allImages: GalleryImage[] = galleryRes.data.flatMap((album) =>
          album.images.map((img: any) => ({
            _id: img._id,
            title: album.title,
            imageUrl: img.imageUrl,
          }))
        );

        setLatestGalleryImages(allImages.slice(0, 3));
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="flex flex-col min-h-screen">
      {/* Slider */}
      <HomeSlider />

      {/* Latest Events */}
      <section className="w-full bg-gradient-to-b from-blue-50 to-blue-100 px-6 py-12">
        <h2 className="text-3xl font-bold mb-8 text-center text-blue-900">
          Latest Events
        </h2>

        {latestEvents.length === 0 ? (
          <p className="text-center text-gray-600">No upcoming events found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestEvents.map((event) => (
              <div
                key={event._id}
                className="bg-white rounded-lg shadow-md p-6 flex flex-col transition transform hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Date Badge */}
                <div className="flex items-center mb-4">
                  <div className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {moment(event.date).format("MMM DD, YYYY")}
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-blue-800 mb-2">
                  {event.name}
                </h3>
                <p className="text-gray-600 flex-1">{event.description}</p>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-10">
          <Link
            href="/resident/events"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-full font-medium hover:bg-blue-700 transition"
          >
            View All Events
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </section>

      {/* Latest Gallery */}
      <section className="w-full bg-gray-50 px-6 py-10">
        <h2 className="text-2xl font-bold mb-6 text-center">Latest Gallery</h2>
        {latestGalleryImages.length === 0 ? (
          <p className="text-center">No gallery images found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestGalleryImages.map((img) => (
              <div
                key={img._id}
                className="bg-white rounded shadow overflow-hidden"
              >
                <img
                  src={`http://localhost:5000${img.imageUrl}`}
                  alt={img.title}
                  className="w-full h-48 object-cover"
                />
                <h3 className="p-2 text-center font-semibold">{img.title}</h3>
              </div>
            ))}
          </div>
        )}
        <div className="text-center mt-6">
          <Link
            href="/gallery"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded"
          >
            View All Gallery
          </Link>
        </div>
      </section>

      {/* Contact Us */}
      <section
        className="relative w-full text-white px-6 py-20 bg-black bg-top-right bg-no-repeat"
        style={{
          backgroundImage: "url('/header.jpg')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-[#0000006e] bg-opacity-20"></div>

        {/* Content */}
        <div className="relative max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Contact Us</h2>
          <p className="mb-6 text-gray-200">
            Have questions or need assistance? Our team is here to help you with
            <br />
            any inquiries about the society events, facilities, or services.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </main>
  );
}
