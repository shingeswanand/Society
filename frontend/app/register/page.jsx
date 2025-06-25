'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    flatNumber: '',
    password: '',
  });
  const router = useRouter();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/users/register', form);
      alert('Registered successfully');
      router.push('/login');
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        <input name="name" placeholder="Name" onChange={handleChange} required className="input mb-2" />
        <input name="email" placeholder="Email" type="email" onChange={handleChange} required className="input mb-2" />
        <input name="flatNumber" placeholder="Flat Number" onChange={handleChange} className="input mb-2" />
        <input name="password" placeholder="Password" type="password" onChange={handleChange} required className="input mb-4" />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Register</button>
      </form>
    </div>
  );
}
