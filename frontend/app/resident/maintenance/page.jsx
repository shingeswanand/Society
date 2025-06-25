'use client';

import { useEffect, useState } from 'react';
import axios from '@/utils/axiosInstance';
import withAuth from '@/utils/withAuth';

function AdminMaintenancePage() {
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    try {
      const res = await axios.get('/maintenance/admin/all');
      setRequests(res.data);
    } catch (err) {
      console.error('Error loading requests', err);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await axios.put(`/maintenance/${id}`, { status: newStatus });
      fetchRequests(); // reload updated list
    } catch (err) {
      console.error('Update failed', err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Maintenance Requests</h1>

      <div className="grid gap-4">
        {requests.map(req => (
          <div key={req._id} className="bg-white p-4 rounded shadow space-y-1">
            <p><strong>Flat:</strong> {req.flatNumber}</p>
            <p><strong>Resident:</strong> {req.user?.name}</p>
            <p><strong>Issue:</strong> {req.issue}</p>
            <p><strong>Description:</strong> {req.description}</p>
            <p><strong>Status:</strong> <span className="font-semibold">{req.status}</span></p>

            <select
              value={req.status}
              onChange={(e) => updateStatus(req._id, e.target.value)}
              className="border px-2 py-1 rounded"
            >
              <option>Pending</option>
              <option>In Progress</option>
              <option>Resolved</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}

export default withAuth(AdminMaintenancePage, { adminOnly: true });
