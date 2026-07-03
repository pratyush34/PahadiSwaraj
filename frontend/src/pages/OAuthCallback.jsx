import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { setToken } from '../utils/auth.js';

export default function OAuthCallback() {
  const navigate = useNavigate();
  const { search } = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(search);
    const token = params.get('token');

    if (token) {
      setToken(token);
      navigate('/dashboard', { replace: true });
    } else {
      navigate('/login?oauth=failed', { replace: true });
    }
  }, [navigate, search]);

  return (
    <div className="oauth-callback">
      <h2>Signing you in...</h2>
      <p>Please wait while we finish connecting your account.</p>
    </div>
  );
}
