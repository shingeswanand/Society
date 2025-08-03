'use client';

import { useState, useEffect } from 'react';
import axios from '@/utils/axiosInstance';
import withAuth from '@/utils/withAuth';
import moment from 'moment';

function AdminCreatePayment() {
  const [users, setUsers] = useState([]);
  const [payments, setPayments] = useState([]);
  const [form, setForm] = useState({
    userId: '',
    flatNumber: '',
    amount: '',
    dueDate: '',
  });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  // Fetch residents
  useEffect(() => {
    axios
      .get('/users')
      .then((res) => setUsers(res.data.filter((u) => !u.isAdmin)))
      .catch((err) => console.error('Failed to load users', err));
  }, []);

  // Fetch payments
  const fetchPayments = async () => {
    try {
      const res = await axios.get('/maintenance-payments');
      setPayments(res.data);
    } catch (err) {
      console.error('Error loading payments', err);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');
    setError('');
    try {
      await axios.post('/maintenance-payments', form);
      setSuccess('Payment record created!');
      setForm({ userId: '', flatNumber: '', amount: '', dueDate: '' });
      fetchPayments();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to create record');
    }
  };

  // Mark as paid
  const markAsPaid = async (id) => {
  try {
    await axios.put(`/maintenance-payments/${id}/verify`);
    fetchPayments();
  } catch (err) {
    console.error('Failed to mark as paid', err);
    setError('Failed to mark as paid');
  }
};


  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Create Maintenance Payment</h1>

      {success && <p className="text-green-600 mb-2">{success}</p>}
      {error && <p className="text-red-600 mb-2">{error}</p>}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <select
          required
          value={form.userId}
          onChange={(e) =>
            setForm({
              ...form,
              userId: e.target.value,
              flatNumber:
                users.find((u) => u._id === e.target.value)?.flatNumber || '',
            })
          }
          className="w-full border px-3 py-2 rounded"
        >
          <option value="">Select Resident</option>
          {users.map((u) => (
            <option key={u._id} value={u._id}>
              {u.name} ({u.flatNumber})
            </option>
          ))}
        </select>

        <input
          type="number"
          required
          placeholder="Amount"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
          className="w-full border px-3 py-2 rounded"
        />

        <input
          type="date"
          required
          value={form.dueDate}
          onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
          className="w-full border px-3 py-2 rounded"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create Payment
        </button>
      </form>

      {/* Existing Payments */}
      <h2 className="text-lg font-semibold mb-2">All Maintenance Payments</h2>
      {payments.length === 0 ? (
        <p>No payment records.</p>
      ) : (
        <div className="space-y-4">
          {payments.map((p) => (
            <div
              key={p._id}
              className="bg-white border p-4 rounded flex flex-col md:flex-row justify-between items-start md:items-center"
            >
              <div>
                <p>
                  <strong>{p.user?.name}</strong> (Flat {p.flatNumber})
                </p>
                <p>Amount: ₹{p.amount}</p>
                <p>Due: {moment(p.dueDate).format('MMMM D, YYYY')}</p>
                <p>
                  Status:{' '}
                  {p.paid ? (
                    <span className="text-green-600">Paid</span>
                  ) : (
                    <span className="text-red-600">Pending</span>
                  )}
                </p>
              </div>

              {!p.paid && (
                <button
                  onClick={() => markAsPaid(p._id)}
                  className="mt-2 md:mt-0 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-sm"
                >
                  Mark as Paid
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default withAuth(AdminCreatePayment, { adminOnly: true });
