'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function withAuth(WrappedComponent, { adminOnly = false } = {}) {
  return function ProtectedComponent(props) {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');

      if (!token || !user) {
        router.replace('/login');
        return;
      }

      const parsedUser = JSON.parse(user);

      if (adminOnly && !parsedUser.isAdmin) {
        router.replace('/login');
      }
    }, []);

    return <WrappedComponent {...props} />;
  };
}
