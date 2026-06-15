import React from 'react';
import { Link } from 'react-router-dom';

export default function Navigation({ theme, setTheme }) {
  const [menuOpen, setMenuOpen] = React.useState(false);

  const closeMenu = () => setMenuOpen(false);

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
            className="nav-link"
            onClick={closeMenu}
          >
            Home
          </Link>
          <Link 
            to="/dashboard" 
            className="nav-link"
            onClick={closeMenu}
          >
            Dashboard
          </Link>
          <Link 
            to="/about" 
            className="nav-link"
            onClick={closeMenu}
          >
            About
          </Link>
          <Link 
            to="/login" 
            className="nav-link nav-login"
            onClick={closeMenu}
          >
            Login
          </Link>
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
