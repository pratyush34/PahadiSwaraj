import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const result = await response.json();
      if (response.ok) {
        localStorage.setItem('pahadiSwarajToken', result.token);
        navigate('/dashboard');
      } else {
        setError(result.error || 'Invalid credentials');
      }
    } catch (err) {
      setError('Unable to reach authentication service.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1>Welcome Back</h1>
          <p>Sign in to your PahadiSwaraj account</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
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

          <button type="submit" className="btn-primary login-btn" disabled={isLoading}>
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className="login-divider">
          <span>or</span>
        </div>

        <div className="login-social">
          <button className="btn-social google">
            <span>🔗</span> Continue with Google
          </button>
          <button className="btn-social github">
            <span>🔗</span> Continue with GitHub
          </button>
        </div>

        <div className="login-footer">
          <p>
            Don't have an account? <Link to="/signup" className="link">Sign up here</Link>
          </p>
          <p>
            <Link to="/reset-password" className="link">Forgot your password?</Link>
          </p>
        </div>
      </div>

      <div className="login-benefits">
        <h2>Why Sign In?</h2>
        <div className="benefits-list">
          <div className="benefit-item">
            <span className="benefit-icon">💾</span>
            <h3>Save Your Work</h3>
            <p>Access your generated descriptions anytime, anywhere</p>
          </div>
          <div className="benefit-item">
            <span className="benefit-icon">🔄</span>
            <h3>Quick Reuse</h3>
            <p>Build on previous descriptions with one click</p>
          </div>
          <div className="benefit-item">
            <span className="benefit-icon">📊</span>
            <h3>Analytics</h3>
            <p>Track your content generation and performance</p>
          </div>
          <div className="benefit-item">
            <span className="benefit-icon">⭐</span>
            <h3>Premium Features</h3>
            <p>Unlock advanced AI tones and bulk generation</p>
          </div>
        </div>
      </div>
    </div>
  );
}
