import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
<<<<<<< HEAD
=======
import { setToken } from '../utils/auth.js';
import { API_BASE } from '../utils/auth.js';
>>>>>>> 6a3d0ab (Added backend auth files: User.js, auth.js, verifyToken.js, passport.js)

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
<<<<<<< HEAD
  const [success, setSuccess] = useState('');
=======
>>>>>>> 6a3d0ab (Added backend auth files: User.js, auth.js, verifyToken.js, passport.js)
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
<<<<<<< HEAD
    setSuccess('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
=======
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
>>>>>>> 6a3d0ab (Added backend auth files: User.js, auth.js, verifyToken.js, passport.js)
        body: JSON.stringify({ name, email, password })
      });

      const result = await response.json();
      if (response.ok) {
<<<<<<< HEAD
        setSuccess('Registration successful. Redirecting to login...');
        setTimeout(() => navigate('/login'), 1500);
      } else {
        setError(result.error || (result.errors && result.errors[0]?.msg) || 'Registration failed.');
      }
    } catch (err) {
      setError('Unable to reach registration service.');
=======
        setToken(result.token);
        navigate('/dashboard');
      } else {
        setError(result.error || 'Registration failed.');
      }
    } catch (err) {
      setError('Unable to reach backend server.');
>>>>>>> 6a3d0ab (Added backend auth files: User.js, auth.js, verifyToken.js, passport.js)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
<<<<<<< HEAD
          <h1>Create your account</h1>
          <p>Register for PahadiSwaraj to save and manage descriptions.</p>
=======
          <h1>Create an Account</h1>
          <p>Register for access to saved drafts and premium generation features</p>
>>>>>>> 6a3d0ab (Added backend auth files: User.js, auth.js, verifyToken.js, passport.js)
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
<<<<<<< HEAD
              placeholder="Your name"
=======
              placeholder="Your full name"
>>>>>>> 6a3d0ab (Added backend auth files: User.js, auth.js, verifyToken.js, passport.js)
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
<<<<<<< HEAD

=======
>>>>>>> 6a3d0ab (Added backend auth files: User.js, auth.js, verifyToken.js, passport.js)
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
<<<<<<< HEAD
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
=======

          <button type="submit" className="btn-primary login-btn" disabled={isLoading}>
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="login-divider">
          <span>or</span>
        </div>

        <p className="login-footer">
          Already have an account? <Link to="/login" className="link">Sign in</Link>
        </p>
>>>>>>> 6a3d0ab (Added backend auth files: User.js, auth.js, verifyToken.js, passport.js)
      </div>
    </div>
  );
}
