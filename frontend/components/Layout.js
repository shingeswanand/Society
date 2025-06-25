import Sidebar from './Sidebar';
import Topbar from './Topbar';
// import './app/globals.css'; // Make sure this import exists

import '../app/globals.css'


export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="p-4">{children}</main>
      </div>
    </div>
  );
}
