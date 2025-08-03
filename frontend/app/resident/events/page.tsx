"use client";

import { useEffect, useState } from "react";
import axios from "@/utils/axiosInstance";
import moment from "moment";

type EventType = {
  _id: string;
  name: string;
  date: string;
  description: string;
};

export default function ResidentEventsPage() {
  const [events, setEvents] = useState<EventType[]>([]);
  const [registering, setRegistering] = useState<string | null>(null);
  const [registeredEvents, setRegisteredEvents] = useState<string[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch upcoming events
    axios
      .get("/events/upcoming")
      .then((res) => setEvents(res.data))
      .catch((err) => {
        console.error(err);
        setError("Failed to load events.");
      });

    // Fetch already registered events for the logged-in user
    axios
      .get("/events/registered") // Make sure your backend supports this
      .then((res) => setRegisteredEvents(res.data.map((e: EventType) => e._id)))
      .catch((err) => {
        console.error("Failed to fetch registered events", err);
      });
  }, []);

  const handleRegister = async (eventId: string) => {
    setError("");
    setRegistering(eventId);
    try {
      await axios.post(`/events/${eventId}/register`);
      setRegisteredEvents((prev) => [...prev, eventId]);
    } catch (err: any) {
      console.error(err);
      if (err.response?.data?.message) {
        const msg = err.response.data.message;
        setError(msg);

        // If already registered, mark it as registered
        if (msg.includes("already registered")) {
          setRegisteredEvents((prev) => [...prev, eventId]);
        }
      } else {
        setError("Need to login.");
      }
    } finally {
      setRegistering(null);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Upcoming Society Events</h1>
      {error && <p className="text-red-500 mb-2">{error}</p>}

      {events.length === 0 ? (
        <p>No upcoming events.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {events.map((event) => {
            const isRegistered = registeredEvents.includes(event._id);
            const isLoading = registering === event._id;

            return (
              <div
                key={event._id}
                className="bg-white p-4 rounded shadow border"
              >
                <h2 className="text-xl font-semibold">{event.name}</h2>
                <p className="text-sm text-gray-500">
                  {moment(event.date).format("MMMM Do, YYYY")}
                </p>
                <p className="mt-2">{event.description}</p>

                {isRegistered ? (
                  <p className="mt-3 text-green-600 font-semibold">
                    You have registered.
                  </p>
                ) : (
                  <button
                    onClick={() => handleRegister(event._id)}
                    disabled={isLoading}
                    className="mt-3 bg-blue-600 text-white px-4 py-2 rounded disabled:bg-blue-300"
                  >
                    {isLoading ? "Registering..." : "Register"}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
