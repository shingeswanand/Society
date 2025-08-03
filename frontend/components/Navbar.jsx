'use client';

import Link from 'next/link';
import { useAuth } from '../app/context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gray-800 text-white p-4 flex items-center justify-between">
      {/* Left: Logo */}
      <Link href="/" className="font-bold text-lg">
        🏢 Society
      </Link>

      {/* Right: Menu */}
      <div className="flex items-center gap-4">
        {user?.isAdmin && (
          <>
            <Link href="/admin/dashboard">Dashboard</Link>
            <Link href="/admin/events">Events</Link>
            <Link href="/admin/users">Users</Link>
            <Link href="/admin/gallery">Gallery</Link>
            <Link href="/admin/maintenance-payments">Maintenance Records</Link>
            <Link href="/admin/feedback">Feedback</Link>
          </>
        )}

        {user && !user.isAdmin && (
          <>
            <Link href="/resident/dashboard">Dashboard</Link>
            <Link href="/resident/events">Events</Link>
            <Link href="/gallery">Gallery</Link>
            <Link href="/resident/visitors">Visitor Entry</Link>
            <Link href="/resident/maintenance">Maintenance</Link>
            <Link href="/resident/maintenance-payments">My Maintenance</Link>
            <Link href="/resident/feedback">Feedback</Link>
          </>
        )}

        {!user && (
          <>
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/gallery">Gallery</Link>
            <Link href="/contact">Contact Us</Link>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </>
        )}

        {user && (
          <button
            onClick={logout}
            className="bg-red-600 px-3 py-1 rounded"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
