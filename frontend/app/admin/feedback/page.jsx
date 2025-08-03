'use client';

import { useState, useEffect } from 'react';
import axios from '@/utils/axiosInstance';
import moment from 'moment';
import withAuth from '@/utils/withAuth';

function AdminFeedbackPage() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchFeedbacks = async () => {
    try {
      const res = await axios.get('/feedback');
      setFeedbacks(res.data);
    } catch (err) {
      console.error(err);
      setError('Failed to load feedback');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  if (loading) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Resident Feedback</h1>
      {error && <p className="text-red-600 mb-4">{error}</p>}

      {feedbacks.length === 0 ? (
        <p>No feedback found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {feedbacks.map((f) => (
            <div
              key={f._id}
              className="bg-white border rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col justify-between"
            >
              <div>
                <p className="text-gray-800 font-semibold">
                <span className="font-medium">Name:</span>  {f.user?.name || 'Anonymous'}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                 <span className="font-medium">Email:</span> {f.user?.email}
                </p>
                <p className="text-sm mb-2">
                  <span className="font-medium">Type:</span> {f.type}
                </p>
                <p className="text-sm mb-2">
                  <span className="font-medium">Rating:</span> {f.rating}/5
                </p>
                <span className="font-medium">Feedback:</span><p className="text-gray-700">{f.message}</p>
              </div>
              <p className="text-xs text-gray-500 mt-3">
                Submitted {moment(f.createdAt).fromNow()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default withAuth(AdminFeedbackPage, { adminOnly: true });
