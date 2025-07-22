'use client';

import withAuth from '@/utils/withAuth';
import axios from '@/utils/axiosInstance';
import { useEffect, useState } from 'react';
import { CalendarDays, Wrench, Users } from 'lucide-react';

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
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">👋 Welcome, {user?.name || 'Resident'}</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Events Card */}
        <DashboardCard title="Upcoming Events" icon={<CalendarDays className="w-6 h-6 text-blue-500" />}>
          {events.length === 0 ? (
            <p className="text-gray-500">No upcoming events.</p>
          ) : (
            <ul className="space-y-1 text-sm">
              {events.slice(0, 4).map(e => (
                <li key={e._id} className="flex justify-between">
                  <span>{e.title}</span>
                  <span className="text-gray-500">{new Date(e.date).toLocaleDateString()}</span>
                </li>
              ))}
            </ul>
          )}
        </DashboardCard>

        {/* Maintenance Card */}
        <DashboardCard title="Maintenance Status" icon={<Wrench className="w-6 h-6 text-yellow-500" />}>
          {maintenance.length === 0 ? (
            <p className="text-gray-500">No records found.</p>
          ) : (
            <ul className="space-y-1 text-sm">
              {maintenance.slice(0, 4).map(m => (
                <li key={m._id}>
                  <div className="font-medium">{m.issue}</div>
                  <span className="text-xs text-gray-600">Status: {m.status}</span>
                </li>
              ))}
            </ul>
          )}
        </DashboardCard>

        {/* Visitor Logs Card */}
        <DashboardCard title="Recent Visitors" icon={<Users className="w-6 h-6 text-green-500" />}>
          {visitors.length === 0 ? (
            <p className="text-gray-500">No visitors logged.</p>
          ) : (
            <ul className="space-y-1 text-sm">
              {visitors.slice(0, 4).map(v => (
                <li key={v._id}>
                  <div className="font-medium">{v.name}</div>
                  <div className="text-xs text-gray-600">
                    {v.purpose} — {new Date(v.timestamp).toLocaleString()}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </DashboardCard>
      </div>
    </div>
  );
}

function DashboardCard({ title, children, icon }) {
  return (
    <div className="bg-white rounded-lg shadow p-5">
      <div className="flex items-center gap-2 mb-4">
        {icon}
        <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
      </div>
      {children}
    </div>
  );
}

export default withAuth(ResidentDashboard);
