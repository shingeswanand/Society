"use client";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();
import { useRouter } from 'next/navigation';


export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
 const router = useRouter();
  useEffect(() => {
    // Load from localStorage on first load
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData, token) => {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
    setUser(userData); // Important: this triggers re-render
  };

 const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  setUser(null);
  router.push('/'); 
};


  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
