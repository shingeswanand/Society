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
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("/events/upcoming")
      .then((res) => {
        console.log(res.data); // check output
        setEvents(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Upcoming Society Events</h1>
      {error && <p className="text-red-500">{error}</p>}

      {events.length === 0 ? (
        <p>No upcoming events.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {events.map((event) => (
            <div key={event._id} className="bg-white p-4 rounded shadow">
              <h2 className="text-xl font-semibold">{event.name}</h2>
              <p className="text-sm text-gray-500">
                {event.date
                  ? moment(event.date).format("MMMM Do YYYY")
                  : "Date not available"}
              </p>
              <p className="mt-2">{event.description}</p>
              <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded">
                Register
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
