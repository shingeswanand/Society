'use client';

import { useEffect, useState } from 'react';
import axios from '@/utils/axiosInstance';
import withAuth from '@/utils/withAuth';

function AdminMaintenancePage() {
  const [requests, setRequests] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 6;

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
      fetchRequests();
    } catch (err) {
      console.error('Update failed', err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  useEffect(() => {
    let result = [...requests];

    if (search) {
      result = result.filter((r) =>
        [r.flatNumber, r.issue, r.user?.name].some((val) =>
          val?.toLowerCase().includes(search.toLowerCase())
        )
      );
    }

    if (statusFilter) {
      result = result.filter((r) => r.status === statusFilter);
    }

    result.sort((a, b) =>
      sortOrder === 'asc'
        ? new Date(a.createdAt) - new Date(b.createdAt)
        : new Date(b.createdAt) - new Date(a.createdAt)
    );

    setFiltered(result);
    setCurrentPage(1); // reset to first page on filter/search
  }, [search, statusFilter, sortOrder, requests]);

  const paginated = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);
  const totalPages = Math.ceil(filtered.length / perPage);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-blue-700 mb-6">🛠 Admin Maintenance Panel</h1>

      {/* Filter Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by flat, name, issue..."
          className="w-full md:w-1/3 border px-4 py-2 rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="w-full md:w-1/4 border px-4 py-2 rounded"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
        </select>

        <button
          onClick={() => setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))}
          className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 text-sm"
        >
          Sort: {sortOrder === 'asc' ? 'Oldest' : 'Newest'}
        </button>
      </div>

      {/* Maintenance Cards */}
      {filtered.length === 0 ? (
        
        <p className="text-gray-600">No matching requests found.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginated.map((req) => (
              <div
                key={req._id}
                className="bg-white p-5 rounded-lg border shadow-sm hover:shadow-md"
              >
                <h2 className="font-bold text-gray-800 mb-1">
                  🏠 Flat: {req.flatNumber}
                </h2>
                <p className="text-sm text-gray-600">
                  👤 {req.user?.name} ({req.user?.email})
                </p>
                
                <p className="mt-2 text-sm text-gray-700"><strong>Issue:</strong> {req.issue}</p>
                <p className="text-sm text-gray-700"><strong>Description:</strong> {req.description}</p>

                <div className="mt-3">
                  <label className="text-sm">Status:</label>
                  <select
                    value={req.status}
                    onChange={(e) => updateStatus(req._id, e.target.value)}
                    className="w-full mt-1 border px-3 py-1 rounded text-sm"
                  >
                    <option>Pending</option>
                    <option>In Progress</option>
                    <option>Resolved</option>
                  </select>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-6 gap-2">
            {Array.from({ length: totalPages }, (_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPage(idx + 1)}
                className={`px-3 py-1 rounded border text-sm ${
                  currentPage === idx + 1
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-800'
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default withAuth(AdminMaintenancePage, { adminOnly: true });
