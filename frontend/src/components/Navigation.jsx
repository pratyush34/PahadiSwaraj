import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth.js';

export default function Navigation({ theme, setTheme }) {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const location = useLocation();

  const closeMenu = () => setMenuOpen(false);

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo" onClick={closeMenu}>
          <span className="emoji">🏔️</span> PahadiSwaraj <span className="emoji">🌾</span>
        </Link>
        
        <button 
          className="menu-toggle" 
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`nav-menu ${menuOpen ? 'active' : ''}`}>
          <Link 
            to="/" 
            className={`nav-link ${isActive('/') ? 'active' : ''}`}
            onClick={closeMenu}
          >
            Home
          </Link>
          {isAuthenticated() && (
            <>
              <Link 
                to="/dashboard" 
                className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}
                onClick={closeMenu}
              >
                Dashboard
              </Link>
              <Link 
                to="/profile" 
                className={`nav-link ${isActive('/profile') ? 'active' : ''}`}
                onClick={closeMenu}
              >
                Profile
              </Link>
            </>
          )}
          <Link 
            to="/about" 
            className={`nav-link ${isActive('/about') ? 'active' : ''}`}
            onClick={closeMenu}
          >
            About
          </Link>
          {!isAuthenticated() ? (
            <>
              <Link 
                to="/login" 
                className={`nav-link nav-login ${isActive('/login') ? 'active' : ''}`}
                onClick={closeMenu}
              >
                Login
              </Link>
              <Link 
                to="/signup" 
                className={`nav-link nav-signup ${isActive('/signup') ? 'active' : ''}`}
                onClick={closeMenu}
              >
                Sign Up
              </Link>
            </>
          ) : null}
          <button 
            className="btn-theme"
            onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
          </button>
        </div>
      </div>
    </nav>
  );
}
