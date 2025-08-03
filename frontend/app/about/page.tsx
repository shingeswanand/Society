"use client";

import React from "react";
import Link from "next/link";

export default function AboutUs() {
  return (
    <main className="bg-gray-50">
      {/* Banner */}
      <section
        className="relative h-72 bg-center bg-cover flex items-center justify-center text-white"
        style={{ backgroundImage: "url('/header.jpg')" }}
      >
        <div className="absolute inset-0 bg-opacity-50"></div>
        <h1 className="relative text-3xl md:text-4xl font-bold">
          About Us / Our Story
        </h1>
      </section>

      <div className="max-w-12xl mx-auto p-0">
        {/* History & Background */}
        <section className="flex flex-col md:flex-row gap-8 items-center px-8 my-10">
          {/* Text */}
          <div className="flex-1 space-y-4">
            <h2 className="text-xl font-semibold text-blue-600">
              History & Background:
            </h2>
            <ul className="space-y-2">
              {[
                "🏢 Park Street Society is a premium residential project developed by Pride Purple Group, one of Pune’s leading real estate developers.",
                "📍 Located in Wakad, Pune, the society comprises 18 towers with 600+ residential flats, offering 2 BHK, 3 BHK, and 4 BHK apartments.",
                "🌿 Established in the early 2000s, the society has grown into a self-sustaining community with top-notch facilities and an active resident committee.",
              ].map((item, i) => (
                <li key={i} className="flex items-start">
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/contact"
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded mt-4"
            >
              Contact Us
            </Link>
          </div>

          {/* Image */}
          <div className="flex-1 w-full">
            <img
              src="https://images.unsplash.com/photo-1571624436279-b272aff752b5?q=80&w=2072"
              alt="About Us"
              className="rounded shadow w-full"
            />
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="my-12 text-center px-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-blue-600 mb-6">
            Our Mission & Vision
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Community Harmony",
                description:
                  "To create a harmonious living environment with a strong sense of community.",
                emoji: "🤝",
              },
              {
                title: "Modern & Secure Living",
                description:
                  "To provide modern, sustainable, and secure living spaces for residents.",
                emoji: "🏠",
              },
              {
                title: "Active Participation",
                description:
                  "To encourage active participation in cultural, social, and environmental initiatives.",
                emoji: "🌿",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded shadow hover:shadow-md transition"
              >
                <div className="text-4xl mb-2">{item.emoji}</div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Committee */}
        <section className="my-12 px-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-blue-600 text-center mb-6">
            Society Management Committee (SMC)
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              {
                position: "President",
                name: "Mr. XYZ",
                contact: "+91 XXXXXXXXXX",
              },
              {
                position: "Secretary",
                name: "Mrs. ABC",
                contact: "+91 XXXXXXXXXX",
              },
              {
                position: "Treasurer",
                name: "Mr. DEF",
                contact: "+91 XXXXXXXXXX",
              },
              {
                position: "Maintenance Head",
                name: "Mr. GHI",
                contact: "+91 XXXXXXXXXX",
              },
              {
                position: "Security In-charge",
                name: "Mr. JKL",
                contact: "+91 XXXXXXXXXX",
              },
            ].map((member, i) => (
              <div key={i} className="bg-white rounded shadow p-4 text-center">
                <h3 className="text-blue-600 font-semibold">
                  {member.position}
                </h3>
                <p>{member.name}</p>
                <p className="text-gray-500">{member.contact}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Achievements */}
        <section
          className="relative py-16 text-white"
          style={{
            backgroundImage: "url('/banner.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/80"></div>

          <div className="relative max-w-6xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
              Achievements & Milestones
            </h2>
            <div className="grid text-black grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Top Society Recognition",
                  desc: "Recognized as one of the best societies in Wakad for excellent facilities and management.",
                  emoji: "⭐",
                },
                {
                  title: "Community Events",
                  desc: "Successfully hosted cultural fests, yoga days, and resident celebrations.",
                  emoji: "🎉",
                },
                {
                  title: "Eco-Friendly Living",
                  desc: "Implemented solar energy systems and robust waste management.",
                  emoji: "🌱",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white bg-opacity-10 backdrop-blur-md p-6 rounded-lg text-center transform transition duration-300 hover:scale-105 hover:bg-opacity-20"
                >
                  <div className="text-5xl mb-4">{item.emoji}</div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
