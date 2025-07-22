'use client';

import { useEffect, useState } from 'react';
import axios from '@/utils/axiosInstance';
import withAuth from '@/utils/withAuth';
import moment from 'moment';

function ResidentPaymentsPage() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await axios.get('/maintenance-payments/my');
        setPayments(res.data);
      } catch (err) {
        console.error('Failed to load payments:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPayments();
  }, []);

  if (loading) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Maintenance Dues</h1>
      {payments.length === 0 ? (
        <p>No dues found.</p>
      ) : (
        <ul className="space-y-4">
          {payments.map((p) => (
            <li key={p._id} className="bg-white p-4 rounded shadow">
              <p><strong>Flat:</strong> {p.flatNumber}</p>
              <p><strong>Amount:</strong> ₹{p.amount}</p>
              <p><strong>Due:</strong> {moment(p.dueDate).format('MMMM D, YYYY')}</p>
              <p>
                <strong>Status:</strong>{' '}
                {p.paid ? (
                  <span className="text-green-600">
                    Paid {p.paidDate ? `on ${moment(p.paidDate).format('MMMM D, YYYY')}` : ''}
                  </span>
                ) : p.requestedPaid ? (
                  <span className="text-yellow-600">Payment Confirmation Requested</span>
                ) : (
                  <span className="text-red-600">Pending</span>
                )}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default withAuth(ResidentPaymentsPage);
