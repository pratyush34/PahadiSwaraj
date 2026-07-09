import React from 'react';
import { getToken, removeToken } from '../utils/auth.js';
import { useNavigate } from 'react-router-dom';

export default function ProfilePage() {
  const navigate = useNavigate();
  const token = getToken();

  const handleLogout = () => {
    removeToken();
    navigate('/login', { replace: true });
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Profile</h2>
        <p>Manage your account and sessions.</p>
      </div>

      <div className="workspace">
        <div className="card form-panel">
          <h3>Account Details</h3>
          <p><strong>Status:</strong> Signed in</p>
          <p><strong>Token:</strong> {token ? 'Stored securely in browser storage' : 'Not available'}</p>
          <button className="btn-primary" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
