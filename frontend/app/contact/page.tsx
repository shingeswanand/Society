"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Replace with your API
      await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      });
      alert("Message sent successfully!");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error(err);
      alert("Failed to send message.");
    }
  };

  return (
    <>
      {/* Header */}
      <section
        className="relative h-72 bg-center bg-cover flex items-center justify-center text-white"
        style={{ backgroundImage: "url('/header.jpg')" }}
      >
        <div className="absolute inset-0 bg-opacity-50"></div>
        <h1 className="relative text-3xl md:text-4xl font-bold">Contact US</h1>
      </section>

      <main className="max-w-6xl mx-auto px-4 py-2 space-y-12">
        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white shadow rounded p-6 space-y-4">
            <h2 className="text-xl font-semibold">📍 Society Address:</h2>
            <p>Park Street Society, Wakad, Pune, Maharashtra, India - 411057</p>
            <h2 className="text-xl font-semibold mt-4">📞 Contact Numbers:</h2>
            <p>General Inquiry: +91-XXXXXXXXXX</p>
            <p>Society Office: +91-XXXXXXXXXX</p>
            <p>Security Gate: +91-XXXXXXXXXX</p>
            <p>Maintenance Desk: +91-XXXXXXXXXX</p>
          </div>

          <div className="bg-white shadow rounded p-6 space-y-4">
            <h2 className="text-xl font-semibold">📧 Email:</h2>
            <p>
              Office:{" "}
              <a
                href="mailto:info@parkstreetsociety.com"
                className="text-blue-600 underline"
              >
                info@parkstreetsociety.com
              </a>
            </p>
            <p>
              Support:{" "}
              <a
                href="mailto:support@parkstreetsociety.com"
                className="text-blue-600 underline"
              >
                support@parkstreetsociety.com
              </a>
            </p>
            <h2 className="text-xl font-semibold mt-4">📱 Social Media:</h2>
            <div className="flex gap-3 flex-wrap">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
              >
                <i className="fab fa-facebook-f mr-2" />
                Facebook
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
              >
                <i className="fab fa-instagram mr-2" />
                Instagram
              </a>
              <a
                href="https://wa.me/911234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
              >
                <i className="fab fa-whatsapp mr-2" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white shadow rounded p-6 max-w-3xl mx-auto">
          <h2 className="text-xl font-semibold text-center mb-4">
            We'd Love to Hear from You
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                value={formData.name}
                onChange={handleChange}
                className="border border-gray-300 rounded px-4 py-2 w-full"
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                required
                value={formData.email}
                onChange={handleChange}
                className="border border-gray-300 rounded px-4 py-2 w-full"
              />
            </div>
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              className="border border-gray-300 rounded px-4 py-2 w-full"
            />
            <textarea
              name="message"
              placeholder="Message"
              required
              rows={4}
              value={formData.message}
              onChange={handleChange}
              className="border border-gray-300 rounded px-4 py-2 w-full"
            />
            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>

        {/* Google Map */}
        <div className="rounded shadow overflow-hidden">
          <iframe
            title="society-location"
            width="100%"
            height="300"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.0532380579127!2d73.7538268148627!3d18.563964387390078!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bbfcf151f5e1%3A0x229327985391a71e!2sWakad%2C%20Pune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1616143380142!5m2!1sen!2sin"
          ></iframe>
        </div>
      </main>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/911234567890"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 bg-green-600 text-white px-4 py-3 rounded-full shadow-lg flex items-center space-x-2 hover:bg-green-700"
      >
        <i className="fab fa-whatsapp" />
        <span>Chat on WhatsApp</span>
      </a>
    </>
  );
}
