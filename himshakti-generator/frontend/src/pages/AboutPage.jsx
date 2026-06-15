import React from 'react';

export default function AboutPage() {
  return (
    <div className="about-page">
      <section className="about-hero">
        <h1>About PahadiSwaraj</h1>
        <p className="lead">Empowering Mountain Communities Through E-Commerce Excellence</p>
      </section>

      <section className="about-content">
        <div className="about-section">
          <h2>Our Mission</h2>
          <p>
            PahadiSwaraj is dedicated to helping mountain artisans and small businesses succeed in the digital marketplace. 
            We believe every product has a unique story, and we empower sellers with AI-driven tools to tell that story 
            compellingly and authentically.
          </p>
        </div>

        <div className="about-section">
          <h2>What We Do</h2>
          <p>
            Our Description Optimizer uses advanced AI to generate keyword-rich, SEO-optimized product descriptions that 
            convert browsers into buyers. Whether you're selling Himalayan ghee, artisanal textiles, or traditional herbs, 
            we help your products stand out on e-commerce platforms.
          </p>
        </div>

        <div className="about-section">
          <h2>Why We Exist</h2>
          <p>
            Mountain communities have produced exceptional products for centuries. However, many struggle to compete online 
            because they lack the resources for professional copywriting and SEO expertise. PahadiSwaraj levels the playing 
            field by making professional-grade description generation accessible to everyone.
          </p>
        </div>

        <div className="about-section">
          <h2>Our Values</h2>
          <ul className="values-list">
            <li><strong>Authenticity:</strong> We celebrate genuine mountain heritage and traditional practices</li>
            <li><strong>Accessibility:</strong> Technology should empower, not exclude</li>
            <li><strong>Innovation:</strong> We continuously improve our AI to serve you better</li>
            <li><strong>Community:</strong> Success of mountain entrepreneurs is our success</li>
            <li><strong>Sustainability:</strong> We support products and practices that benefit the environment</li>
          </ul>
        </div>

        <div className="about-section">
          <h2>The Team</h2>
          <p>
            PahadiSwaraj was founded by a team of entrepreneurs and technologists passionate about e-commerce innovation 
            and mountain community development. We bring together expertise in AI, e-commerce, and rural entrepreneurship 
            to create solutions that matter.
          </p>
        </div>
      </section>

      <section className="about-cta">
        <h2>Join Us in Our Mission</h2>
        <p>Help mountain artisans reach customers worldwide with descriptions that sell.</p>
        <a href="/dashboard" className="btn-cta">Start Optimizing Today</a>
      </section>
    </div>
  );
}
