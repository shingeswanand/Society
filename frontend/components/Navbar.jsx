'use client';

import Link from 'next/link';
import { useAuth } from '../app/context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between">
      <div className="flex gap-4 items-center">
        <Link href="/" className="font-bold text-lg">🏢 Society</Link>

        {user?.isAdmin && (
  <>
    <Link href="/admin/dashboard">Dashboard</Link>
    <Link href="/events">Events</Link>
    <Link href="/admin/users">Users</Link>
    <Link href="/admin/gallery">Gallery</Link>
  </>
)}

{user && !user.isAdmin && (
  <>
    <Link href="/resident/dashboard">Dashboard</Link>
    <Link href="/resident/events">Events</Link>
    <Link href="/gallery">Gallery</Link>
    <Link href="/resident/visitors">Visitor Entry</Link>
    <Link href="/resident/maintenance">Maintenance</Link>
  </>
)}

        {!user && (
          <>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </>
        )}
      </div>

      {user && (
        <button onClick={logout} className="bg-red-600 px-3 py-1 rounded">
          Logout
        </button>
      )}
    </nav>
  );
}
