'use client';
import withAuth from '@/utils/withAuth';
import Layout from '@/components/Layout';
import axios from '@/utils/axiosInstance';
import { useEffect, useState } from 'react';

 function EventManagementPage() {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({ title: '', date: '', description: '' });
  const [editId, setEditId] = useState(null);

  const fetchEvents = async () => {
    try {
      const res = await axios.get('/events');
      setEvents(res.data);
    } catch (err) {
      console.error('Error fetching events:', err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        const res = await axios.put(`/events/${editId}`, form);
        setEvents((prev) =>
          prev.map((ev) => (ev._id === editId ? res.data : ev))
        );
        setEditId(null);
      } else {
        const res = await axios.post('/events', form);
        setEvents((prev) => [...prev, res.data]);
      }
      setForm({ title: '', date: '', description: '' });
    } catch (err) {
      console.error('Error saving event:', err);
    }
  };

  const handleEdit = (event) => {
    setForm(event);
    setEditId(event._id);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this event?')) return;
    try {
      await axios.delete(`/events/${id}`);
      setEvents(events.filter((e) => e._id !== id));
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Manage Events</h1>

      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6 space-y-4 max-w-xl">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Event Title"
          className="input"
          required
        />
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="input"
          required
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Event Description"
          className="input"
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          {editId ? 'Update Event' : 'Add Event'}
        </button>
      </form>

      <div className="grid gap-4 md:grid-cols-2">
        {events.map((event) => (
          <div key={event._id} className="bg-white p-4 shadow rounded space-y-2">
            <h2 className="text-lg font-bold">{event.title}</h2>
            <p className="text-sm text-gray-500">{event.date}</p>
            <p>{event.description}</p>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(event)} className="text-blue-600 hover:underline">
                Edit
              </button>
              <button onClick={() => handleDelete(event._id)} className="text-red-600 hover:underline">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
export default withAuth(EventManagementPage, { adminOnly: true });