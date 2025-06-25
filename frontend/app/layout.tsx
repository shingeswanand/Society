import "./globals.css";
import { ReactNode } from "react";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "../components/Navbar";

interface LayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
        <a
          href="https://wa.me/919876543210?text=Hi%20I%20have%20a%20query%20regarding%20the%20society%20services"
          target="_blank"
          className="fixed bottom-5 right-5 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600"
          title="Chat on WhatsApp"
        >
          💬
        </a>
      </body>
    </html>
  );
}
