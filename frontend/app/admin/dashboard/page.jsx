'use client';

import { useEffect, useState } from 'react';
import axios from '@/utils/axiosInstance';
import { CalendarCheck, Wrench, Users } from 'lucide-react';
import Layout from '@/components/Layout';

export default function AdminDashboard() {
  const [summary, setSummary] = useState(null);
  const [adminName, setAdminName] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setAdminName(user?.name || 'Admin');

    axios.get('/admin/summary')
      .then(res => setSummary(res.data))
      .catch(err => {
        console.error('Summary error:', err);
        setSummary({ events: 0, maintenance: 0, visitors: 0 });
      });
  }, []);

  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Welcome, {adminName} 👋</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <DashboardCard label="Upcoming Events" value={summary?.events} icon={<CalendarCheck className="text-blue-500 w-6 h-6" />} />
          <DashboardCard label="Visitor Logs Today" value={summary?.visitors} icon={<Users className="text-green-500 w-6 h-6" />} />
          <DashboardCard label="Open Maintenance" value={summary?.maintenance} icon={<Wrench className="text-yellow-500 w-6 h-6" />} />
        </div>
      </div>
    </Layout>
  );
}

function DashboardCard({ label, value, icon }) {
  return (
    <div className="bg-white rounded-lg shadow p-5 flex items-center gap-4">
      <div>{icon}</div>
      <div>
        <h2 className="text-lg font-semibold text-gray-700">{label}</h2>
        <p className="text-2xl font-bold">{value ?? '...'}</p>
      </div>
    </div>
  );
}
