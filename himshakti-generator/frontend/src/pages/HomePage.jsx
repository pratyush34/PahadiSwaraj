import React from 'react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="homepage">
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to PahadiSwaraj</h1>
          <p className="hero-subtitle">
            E-Commerce Keyword-Rich Description Optimizer — make mountain products sing ✨
          </p>
          <p className="hero-description">
            Powered by AI to generate compelling, SEO-optimized product descriptions for your artisanal and mountain goods. 
            Transform your products with descriptions that sell, inspire, and connect with your customers.
          </p>
          <Link to="/dashboard" className="btn-cta">
            Start Generating Descriptions
          </Link>
        </div>
      </section>

      <section className="features">
        <h2>Why Choose PahadiSwaraj?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>Keyword Optimized</h3>
            <p>Boost your SEO rankings with AI-generated, keyword-rich descriptions tailored for e-commerce platforms.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🎨</div>
            <h3>Multiple Tones</h3>
            <p>Choose between Premium, Traditional, or Health-Focused tones to match your brand voice perfectly.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Instant Generation</h3>
            <p>Get multiple description variations in seconds. Edit, refine, and copy with a single click.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">💾</div>
            <h3>History Tracking</h3>
            <p>Save and retrieve your recently generated descriptions. Keep your best content organized and accessible.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🌙</div>
            <h3>Dark Mode</h3>
            <p>Work comfortably with built-in dark mode support for extended sessions and reduced eye strain.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3>Mobile Friendly</h3>
            <p>Access the generator on any device. Fully responsive design works seamlessly on desktop, tablet, and mobile.</p>
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps-container">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Enter Product Details</h3>
            <p>Provide your product name, key ingredients, weight, and unique features.</p>
          </div>

          <div className="step">
            <div className="step-number">2</div>
            <h3>Choose Your Tone</h3>
            <p>Select from Premium, Traditional, or Health-Focused brand voice options.</p>
          </div>

          <div className="step">
            <div className="step-number">3</div>
            <h3>Generate Descriptions</h3>
            <p>Our AI creates multiple optimized description variations instantly.</p>
          </div>

          <div className="step">
            <div className="step-number">4</div>
            <h3>Copy & Use</h3>
            <p>Copy your favorite description and use it across your e-commerce platforms.</p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <h2>Ready to Elevate Your Product Descriptions?</h2>
        <p>Join hundreds of merchants optimizing their e-commerce presence with PahadiSwaraj.</p>
        <Link to="/dashboard" className="btn-cta-secondary">
          Go to Generator
        </Link>
      </section>
    </div>
  );
}
