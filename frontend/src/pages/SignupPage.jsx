import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { setToken } from '../utils/auth.js';
import { API_BASE } from '../utils/auth.js';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });

      const result = await response.json();
      if (response.ok) {
        setSuccess('Registration successful. Redirecting to login...');
        setTimeout(() => navigate('/login'), 1500);
      } else {
        setError(result.error || (result.errors && result.errors[0]?.msg) || 'Registration failed.');
      }
    } catch (err) {
      setError('Unable to reach registration service.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1>Create your account</h1>
          <p>Register for PahadiSwaraj to save and manage descriptions.</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="error-text">{error}</p>}
          {success && <p className="success-text">{success}</p>}

          <button type="submit" className="btn-primary login-btn" disabled={isLoading}>
            {isLoading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>

        <div className="login-footer">
          <p>
            Already have an account? <Link to="/login" className="link">Sign in</Link>
          </p>
        </div>
      </div>

      <div className="login-benefits">
        <h2>Why register?</h2>
        <div className="benefits-list">
          <div className="benefit-item">
            <span className="benefit-icon">💾</span>
            <h3>Save Your Work</h3>
            <p>Access your generated descriptions anytime, anywhere.</p>
          </div>
          <div className="benefit-item">
            <span className="benefit-icon">🔐</span>
            <h3>Secure Access</h3>
            <p>Your account uses secure authentication and JWT sessions.</p>
          </div>
          <div className="benefit-item">
            <span className="benefit-icon">⚡</span>
            <h3>Fast Onboarding</h3>
            <p>Create an account and start generating right away.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
