import Link from 'next/link';

export default function Sidebar() {
  return (
    <div className="w-64 bg-white shadow-md">
      <div className="p-4 font-bold text-xl">🏠 Society</div>
      <nav className="flex flex-col p-2 space-y-2">
        <Link href="/admin/dashboard" className="hover:text-blue-500">Dashboard</Link>
        <Link href="/admin/events" className="hover:text-blue-500">Manage Events</Link>
        <Link href="/admin/visitors" className="hover:text-blue-500">Visitor Logs</Link>
        <Link href="/admin/maintenance" className="hover:text-blue-500">Maintenance</Link>
        <Link href="/resident/dashboard" className="hover:text-green-500">Resident Panel</Link>
      </nav>
    </div>
  );
}
