import { Link } from 'react-router-dom';
import { FiArrowRight, FiCheckCircle, FiShuffle, FiLock, FiZap, FiBox, FiCloud, FiPlay } from 'react-icons/fi';
import './LandingPage.css';

const features = [
  { icon: <FiShuffle size={22} />, title: 'Comprehensive Format Support', desc: 'Convert between the most popular formats for documents, images, audio, and video.' },
  { icon: <FiZap size={22} />, title: 'Lightning-Fast Conversions', desc: 'Powered by async workers — your files process in the background, no waiting around.' },
  { icon: <FiLock size={22} />, title: 'Bank-Grade Security', desc: '256-bit SSL encryption protects your data. All files are automatically deleted after processing.' },
  { icon: <FiBox size={22} />, title: 'No Software to Install', desc: 'SmokeByte works entirely in your browser. No downloads or installations required.' },
  { icon: <FiCheckCircle size={22} />, title: 'High-Quality Results', desc: 'Advanced conversion tools ensure your file quality and structure are preserved.' },
  { icon: <FiCloud size={22} />, title: 'Cloud-Based', desc: 'Access your converted files from anywhere. All conversions happen on secure cloud infrastructure.' },
];

const LandingPage = () => {
  return (
    <div className="landing-page">
      <section className="hero-section">
        <div className="hero-badge">
          <FiZap size={12} /> Free · Fast · Secure
        </div>
        <h1>
          Convert Any File,<br />
          <span>Instantly Online</span>
        </h1>
        <p className="subtitle">
          Documents, images, audio, video — convert between hundreds of formats in seconds. No software needed.
        </p>
        <div className="hero-actions">
          <Link to="/signup" className="cta-button">
            Get Started Free <FiArrowRight />
          </Link>
          <Link to="/formats" className="cta-secondary">
            <FiPlay size={15} /> See All Formats
          </Link>
        </div>
      </section>

      <section id="features" className="features-section">
        <h2>Everything You Need, All in One Place</h2>
        <p className="features-subtitle">
          Powerful tools designed to handle any conversion task with ease.
        </p>
        <div className="features-grid">
          {features.map((f, i) => (
            <div className="feature-card" key={i}>
              <div className="feature-icon-wrap">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default LandingPage;