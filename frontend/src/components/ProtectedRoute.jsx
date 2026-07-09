import React, { useEffect, useState } from 'react';
import { API_BASE, getAuthHeaders, removeToken } from '../utils/auth.js';

export default function ProtectedRoute({ children }) {
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    const verifyAuth = async () => {
      const token = localStorage.getItem('pahadiSwarajToken');
      if (!token) {
        setStatus('unauthenticated');
        return;
      }

      try {
        const response = await fetch(`${API_BASE}/api/auth/verify`, {
          headers: {
            ...getAuthHeaders()
          }
        });

        if (response.ok) {
          setStatus('authenticated');
        } else {
          removeToken();
          setStatus('unauthenticated');
        }
      } catch (error) {
        removeToken();
        setStatus('unauthenticated');
      }
    };

    verifyAuth();
  }, []);

  if (status === 'loading') {
    return <div className="dashboard"><div className="dashboard-header"><h2>Checking access...</h2></div></div>;
  }

  if (status === 'unauthenticated') {
    return (
      <div className="dashboard">
        <div className="dashboard-header">
          <h2>Access denied</h2>
          <p>You must be signed in to view this page.</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
