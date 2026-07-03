import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h4>About</h4>
            <p>PahadiSwaraj - E-Commerce Keyword-Rich Description Optimizer for mountain products and artisanal goods.</p>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/dashboard">Dashboard</a></li>
              <li><a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Features</h4>
            <ul>
              <li>AI-Powered Descriptions</li>
              <li>Multiple Tone Options</li>
              <li>Keyword Optimization</li>
              <li>Dark Mode Support</li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contact</h4>
            <p>Email: <a href="mailto:info@pahadiswaraj.com">info@pahadiswaraj.com</a></p>
            <p>Built with ❤️ for mountain communities</p>
          </div>
        </div>

        <div className="footer-divider"></div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} PahadiSwaraj. All rights reserved.</p>
          <div className="footer-links">
            <a href="/privacy">Privacy Policy</a>
            <span className="divider">•</span>
            <a href="/terms">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
