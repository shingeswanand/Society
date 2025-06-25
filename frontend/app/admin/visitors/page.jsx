'use client';

import { useEffect, useState } from 'react';
import axios from '@/utils/axiosInstance';
import withAuth from '@/utils/withAuth';

function AdminVisitorLog() {
  const [visitors, setVisitors] = useState([]);

  useEffect(() => {
    axios.get('/visitors/admin/all')
      .then(res => setVisitors(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Visitor Logs</h1>
      <div className="grid gap-4">
        {visitors.map(v => (
          <div key={v._id} className="bg-white p-4 rounded shadow">
            <p><strong>Name:</strong> {v.name}</p>
            <p><strong>Purpose:</strong> {v.purpose}</p>
            <p><strong>Flat:</strong> {v.flatNumber}</p>
            <p><strong>Time:</strong> {new Date(v.timestamp).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default withAuth(AdminVisitorLog, { adminOnly: true });
