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
<<<<<<< HEAD
      navigate('/login?oauth=failed', { replace: true });
    }
  }, [navigate, search]);

  return (
    <div className="oauth-callback">
      <h2>Signing you in...</h2>
      <p>Please wait while we finish connecting your account.</p>
=======
      setMessage('Authentication failed. Redirecting to login...');
      setTimeout(() => navigate('/login', { replace: true }), 1800);
    }
  }, [navigate]);

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1>OAuth Sign In</h1>
          <p>{message}</p>
        </div>
      </div>
>>>>>>> 6a3d0ab (Added backend auth files: User.js, auth.js, verifyToken.js, passport.js)
    </div>
  );
}
