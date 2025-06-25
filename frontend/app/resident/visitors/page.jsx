'use client';

import { useState, useEffect } from 'react';
import axios from '@/utils/axiosInstance';
import withAuth from '@/utils/withAuth';

function VisitorLogPage() {
  const [form, setForm] = useState({ name: '', purpose: '', flatNumber: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setForm(prev => ({ ...prev, flatNumber: user.flatNumber }));
    }
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/visitors', form);
      setMessage('Visitor logged successfully');
      setForm({ ...form, name: '', purpose: '' });
    } catch (err) {
      console.error(err);
      setMessage('Error logging visitor');
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <h1 className="text-xl font-bold mb-4">Visitor Entry</h1>
      {message && <p className="mb-4 text-green-600">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" placeholder="Visitor Name" value={form.name} onChange={handleChange} required className="w-full border px-3 py-2 rounded" />
        <input name="purpose" placeholder="Purpose (e.g. delivery)" value={form.purpose} onChange={handleChange} required className="w-full border px-3 py-2 rounded" />
        <input name="flatNumber" value={form.flatNumber} disabled className="w-full border px-3 py-2 rounded bg-gray-100" />
        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Log Visitor</button>
      </form>
    </div>
  );
}

export default withAuth(VisitorLogPage);
