// src/pages/LandingPage.jsx

import { Link } from 'react-router-dom';
import { FiArrowRight, FiCheckCircle, FiShuffle, FiLock } from 'react-icons/fi';
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

      <section id="features" className="features-section">
        <h2>Why Choose SmokeByte?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <FiShuffle size={40} className="feature-icon" />
            <h3>Wide Range of Formats</h3>
            <p>Convert between hundreds of document, image, audio, and video formats.</p>
          </div>
          <div className="feature-card">
            <FiCheckCircle size={40} className="feature-icon" />
            <h3>Simple & Fast</h3>
            <p>Our intuitive drag-and-drop interface makes file conversion a breeze.</p>
          </div>
          <div className="feature-card">
            <FiLock size={40} className="feature-icon" />
            <h3>Secure & Private</h3>
            <p>Your files are encrypted and automatically deleted from our servers after conversion.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;