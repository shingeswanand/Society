'use client';

import { useState, useEffect } from 'react';
import axios from '@/utils/axiosInstance';
import { useAuth } from '@/app/context/AuthContext'; // adjust path if needed
import withAuth from '@/utils/withAuth';

function ResidentMaintenancePage() {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [form, setForm] = useState({
    flatNumber: '',
    issue: '',
    description: ''
  });

  useEffect(() => {
    if (user?.flatNumber) {
      setForm((prev) => ({ ...prev, flatNumber: user.flatNumber }));
    }
    fetchMyRequests();
  }, [user]);

  const fetchMyRequests = async () => {
    try {
      const res = await axios.get('/maintenance');
      setRequests(res.data);
    } catch (err) {
      console.error('Error loading requests', err);
    }
  };

  const submitRequest = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/maintenance', form);
      setForm({ flatNumber: user.flatNumber, issue: '', description: '' });
      fetchMyRequests();
    } catch (err) {
      console.error('Submit error:', err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Raise Maintenance Request</h1>

      <form onSubmit={submitRequest} className="space-y-4 mb-8">
        <input
          type="text"
          placeholder="Flat Number"
          value={form.flatNumber}
          readOnly
          className="w-full border px-4 py-2 rounded bg-gray-100 text-gray-600 cursor-not-allowed"
        />
        <input
          type="text"
          placeholder="Issue Title"
          value={form.issue}
          onChange={(e) => setForm({ ...form, issue: e.target.value })}
          required
          className="w-full border px-4 py-2 rounded"
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
          className="w-full border px-4 py-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </form>

      <h2 className="text-lg font-semibold mb-2">Your Requests</h2>
      <div className="grid gap-4">
        {requests.map((req) => (
          <div key={req._id} className="bg-white p-4 rounded shadow">
            <p><strong>Flat:</strong> {req.flatNumber}</p>
            <p><strong>Issue:</strong> {req.issue}</p>
            <p><strong>Description:</strong> {req.description}</p>
            <p><strong>Status:</strong> {req.status}</p>
            <p><strong>Created:</strong> {new Date(req.createdAt).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default withAuth(ResidentMaintenancePage);
