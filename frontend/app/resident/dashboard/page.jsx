'use client';

import withAuth from '@/utils/withAuth';
import axios from '@/utils/axiosInstance';
import { useEffect, useState } from 'react';

function ResidentDashboard() {
  const [events, setEvents] = useState([]);
  const [maintenance, setMaintenance] = useState([]);
  const [visitors, setVisitors] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const u = localStorage.getItem('user');
    if (u) setUser(JSON.parse(u));
  }, []);

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        const [eventRes, maintenanceRes, visitorRes] = await Promise.all([
          axios.get('/events'),
          axios.get('/maintenance'),
          axios.get(`/visitors/my-flat?flat=${user.flatNumber}`),
        ]);
        setEvents(eventRes.data);
        setMaintenance(maintenanceRes.data);
        setVisitors(visitorRes.data);
      } catch (err) {
        console.error('Dashboard error:', err);
      }
    };

    fetchData();
  }, [user]);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Resident Dashboard</h1>

      {/* Upcoming Events */}
      <section className="bg-white p-4 shadow rounded">
        <h2 className="text-lg font-semibold mb-2">Upcoming Events</h2>
        {events.length === 0 ? <p>No upcoming events.</p> : (
          <ul className="list-disc list-inside">
            {events.map(e => (
              <li key={e._id}>{e.title} – {new Date(e.date).toLocaleDateString()}</li>
            ))}
          </ul>
        )}
      </section>

      {/* Maintenance Dues */}
      <section className="bg-white p-4 shadow rounded">
        <h2 className="text-lg font-semibold mb-2">Maintenance Status</h2>
        {maintenance.length === 0 ? <p>No records found.</p> : (
          <ul className="divide-y">
            {maintenance.map(m => (
              <li key={m._id} className="py-2">
                Issue: {m.issue}<br />
                Status: <span className="font-medium">{m.status}</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Visitor Logs */}
      <section className="bg-white p-4 shadow rounded">
        <h2 className="text-lg font-semibold mb-2">Visitor Log</h2>
        {visitors.length === 0 ? <p>No visitors logged.</p> : (
          <ul className="divide-y">
            {visitors.map(v => (
              <li key={v._id} className="py-2">
                {v.name} – {v.purpose} <br />
                Time: {new Date(v.timestamp).toLocaleString()}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default withAuth(ResidentDashboard); // Only logged-in users
