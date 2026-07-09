import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { setToken } from '../utils/auth.js';

export default function OAuthCallback() {
  const [message, setMessage] = useState('Finishing sign in...');
  const navigate = useNavigate();
  const { search } = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(search);
    const token = params.get('token');

    if (token) {
      setToken(token);
      navigate('/dashboard', { replace: true });
    } else {
      setMessage('Authentication failed. Redirecting to login...');
      setTimeout(() => navigate('/login?oauth=failed', { replace: true }), 1800);
    }
  }, [navigate, search]);

  return (
    <div className="oauth-callback">
      <h2>Signing you in...</h2>
      <p>{message}</p>
    </div>
  );
}
