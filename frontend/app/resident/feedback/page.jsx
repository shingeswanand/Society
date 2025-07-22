'use client';

import { useState } from 'react';
import axios from '@/utils/axiosInstance';
import withAuth from '@/utils/withAuth';

function SubmitFeedbackPage() {
  const [form, setForm] = useState({
    type: 'Service',
    rating: 5,
    message: ''
  });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');
    setError('');
    try {
      await axios.post('/feedback', form);
      setSuccess('Feedback submitted successfully!');
      setForm({ type: 'Service', rating: 5, message: '' });
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to submit feedback');
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-xl font-bold mb-4">Submit Feedback</h1>

      {success && <p className="text-green-600 mb-2">{success}</p>}
      {error && <p className="text-red-600 mb-2">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Type */}
        <select
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="Service">Service</option>
          <option value="Event">Event</option>
        </select>

        {/* Rating */}
        <input
          type="number"
          min="1"
          max="5"
          value={form.rating}
          onChange={(e) => setForm({ ...form, rating: e.target.value })}
          className="w-full border px-3 py-2 rounded"
          placeholder="Rating (1-5)"
        />

        {/* Message */}
        <textarea
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="Your feedback..."
          rows={4}
          className="w-full border px-3 py-2 rounded"
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit Feedback
        </button>
      </form>
    </div>
  );
}

export default withAuth(SubmitFeedbackPage);
