// src/pages/LandingPage.jsx

import { Link } from 'react-router-dom';
import { FiArrowRight, FiCheckCircle, FiShuffle, FiLock, FiZap, FiBox, FiCloud } from 'react-icons/fi';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <section className="hero-section">
        <h1>The Ultimate File Converter</h1>
        <p className="subtitle">Quickly and easily convert your documents, images, and media files online. Secure, fast, and free.</p>
        <Link to="/signup" className="cta-button">
          Get Started for Free <FiArrowRight />
        </Link>
      </section>

      {/* THIS IS THE NEW, UPGRADED FEATURES SECTION */}
      <section id="features" className="features-section">
        <h2>Everything You Need, All in One Place</h2>
        <p className="features-subtitle">Our powerful tools are designed to handle any conversion task with ease.</p>
        <div className="features-grid">
          
          <div className="feature-card">
            <FiShuffle size={32} className="feature-icon" />
            <h3>Comprehensive Format Support</h3>
            <p>Convert between hundreds of the most popular file formats for documents, images, audio, and video.</p>
          </div>

          <div className="feature-card">
            <FiZap size={32} className="feature-icon" />
            <h3>Lightning-Fast Conversions</h3>
            <p>Our powerful servers process your files in seconds, so you don't have to wait.</p>
          </div>
          
          <div className="feature-card">
            <FiLock size={32} className="feature-icon" />
            <h3>Bank-Grade Security</h3>
            <p>We use 256-bit SSL encryption to protect your data, and all files are automatically deleted after a few hours.</p>
          </div>

          <div className="feature-card">
            <FiBox size={32} className="feature-icon" />
            <h3>No Software to Install</h3>
            <p>SmokeByte works entirely in your browser. No downloads or installations required.</p>
          </div>

          <div className="feature-card">
            <FiCheckCircle size={32} className="feature-icon" />
            <h3>High-Quality Results</h3>
            <p>We use advanced conversion APIs to ensure your file's quality is preserved.</p>
          </div>

          <div className="feature-card">
            <FiCloud size={32} className="feature-icon" />
            <h3>Cloud-Based</h3>
            <p>Access your converted files from anywhere. All conversions happen on our secure cloud infrastructure.</p>
          </div>

        </div>
      </section>
    </div>
  );
};

export default LandingPage;