'use client';

import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';


export default function AdminDashboard() {
  const [adminName, setAdminName] = useState('');
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setAdminName(user?.name || 'Admin');

    // TODO: Connect with backend API later
    setSummary({
      events: 5,
      visitors: 12,
      maintenance: 3,
    });
  }, []);

  return (
    <Layout>
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Welcome, {adminName} 👋</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <DashboardCard label="Upcoming Events" value={summary?.events} color="bg-blue-500" />
        <DashboardCard label="Visitor Logs Today" value={summary?.visitors} color="bg-green-500" />
        <DashboardCard label="Open Maintenance" value={summary?.maintenance} color="bg-yellow-500" />
      </div>
    </div>
    </Layout>
  );
}

function DashboardCard({ label, value, color }) {
  return (
    <div className={`${color} text-white p-6 rounded-lg shadow-md`}>
      <h2 className="text-lg font-semibold">{label}</h2>
      <p className="text-3xl font-bold mt-2">{value ?? '...'}</p>
    </div>
  );
}
