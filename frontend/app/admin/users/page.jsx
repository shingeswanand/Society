'use client';

import { useEffect, useState } from 'react';
import axios from '@/utils/axiosInstance';
import withAuth from '@/utils/withAuth';

function AdminUsersPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('/users')
      .then(res => setUsers(res.data))
      .catch(err => console.error('User fetch error', err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">👥 Registered Users</h1>

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="px-6 py-3 text-sm font-semibold">Name</th>
              <th className="px-6 py-3 text-sm font-semibold">Email</th>
              <th className="px-6 py-3 text-sm font-semibold">Flat Number</th>
              <th className="px-6 py-3 text-sm font-semibold">Role</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map(user => (
              <tr key={user._id}>
                <td className="px-6 py-3">{user.name}</td>
                <td className="px-6 py-3">{user.email}</td>
                <td className="px-6 py-3">{user.flatNumber}</td>
                <td className="px-6 py-3">{user.isAdmin ? 'Admin' : 'Resident'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default withAuth(AdminUsersPage, { adminOnly: true });
