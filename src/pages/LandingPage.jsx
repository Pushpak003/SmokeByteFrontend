import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import {
  FiArrowRight, FiShuffle, FiLock, FiZap, FiBox, FiCheckCircle, FiCloud,
} from 'react-icons/fi';
import {
  FaFilePdf, FaFileVideo, FaFileWord, FaFileImage,
  FaFileAudio, FaFileExcel, FaFilePowerpoint,
} from 'react-icons/fa';
import './LandingPage.css';

const features = [
  { icon: <FiShuffle size={22}/>, title: 'Every Format, Covered', desc: 'Images, docs, audio, video — convert between 50+ formats in seconds.' },
  { icon: <FiZap size={22}/>, title: 'Async Processing', desc: 'Upload and go. Conversions run in the background — your file is ready when you are.' },
  { icon: <FiLock size={22}/>, title: 'Secure by Default', desc: '256-bit SSL on every transfer. Files are deleted automatically after processing.' },
  { icon: <FiBox size={22}/>, title: 'No Install Needed', desc: 'Runs entirely in your browser. No plugins, no downloads, no setup.' },
  { icon: <FiCheckCircle size={22}/>, title: 'Quality Preserved', desc: 'Advanced tooling keeps your document structure, resolution, and metadata intact.' },
  { icon: <FiCloud size={22}/>, title: 'Cloud Native', desc: 'Scalable cloud infrastructure means fast, reliable conversions every time.' },
];

const floatingBadges = [
  { label: 'PDF',  icon: <FaFilePdf />,        color: '#ef4444', glow: 'rgba(239,68,68,0.35)'    },
  { label: 'MP4',  icon: <FaFileVideo />,       color: '#8b5cf6', glow: 'rgba(139,92,246,0.35)'   },
  { label: 'DOCX', icon: <FaFileWord />,        color: '#3b82f6', glow: 'rgba(59,130,246,0.35)'   },
  { label: 'PNG',  icon: <FaFileImage />,       color: '#f59e0b', glow: 'rgba(245,158,11,0.35)'   },
  { label: 'MP3',  icon: <FaFileAudio />,       color: '#ec4899', glow: 'rgba(236,72,153,0.35)'   },
  { label: 'XLSX', icon: <FaFileExcel />,       color: '#10b981', glow: 'rgba(16,185,129,0.35)'   },
  { label: 'PPTX', icon: <FaFilePowerpoint />,  color: '#f97316', glow: 'rgba(249,115,22,0.35)'   },
  { label: 'MOV',  icon: <FaFileVideo />,       color: '#a78bfa', glow: 'rgba(167,139,250,0.35)'  },
];

const LandingPage = () => {
  const { user } = useAuth();

  return (
    <div className="landing-page">
      <section className="hero-section">
        <div className="hero-orb hero-orb--1" />
        <div className="hero-orb hero-orb--2" />
        <div className="hero-orb hero-orb--3" />

        <div className="floating-badges">
          {floatingBadges.map(({ label, icon, color, glow }, i) => (
            <span
              key={label}
              className="floating-badge"
              style={{ '--i': i, '--badge-color': color, '--badge-glow': glow }}
            >
              <span className="floating-badge-icon" style={{ color }}>{icon}</span>
              <span className="floating-badge-label">{label}</span>
            </span>
          ))}
        </div>

        <div className="hero-content">
          <div className="hero-eyebrow">
            <span className="eyebrow-dot" />
            Free · Fast · Secure
          </div>

          <h1 className="hero-title">
            Convert Any File
            <br />
            <span className="hero-title--accent">In Seconds</span>
          </h1>

          <p className="hero-subtitle">
            The ultimate online converter for documents, images, audio, and video.
            <br />No software. No limits. Just results.
          </p>

          <div className="hero-actions">
            {user ? (
              <>
                <Link to="/dashboard" className="btn-primary-hero">
                  Go to Dashboard <FiArrowRight />
                </Link>
                <Link to="/history" className="btn-ghost-hero">View History</Link>
              </>
            ) : (
              <>
                <Link to="/signup" className="btn-primary-hero">
                  Get Started Free <FiArrowRight />
                </Link>
                <Link to="/login" className="btn-ghost-hero">Sign In</Link>
              </>
            )}
          </div>

          <div className="hero-stats">
            <div className="hero-stat"><strong>50+</strong><span>Formats</span></div>
            <div className="hero-stat-divider" />
            <div className="hero-stat"><strong>100%</strong><span>Browser-based</span></div>
            <div className="hero-stat-divider" />
            <div className="hero-stat"><strong>Free</strong><span>To use</span></div>
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="section-label">Why SmokeByte</div>
        <h2 className="section-title">Everything You Need,<br />All in One Place</h2>
        <p className="section-subtitle">Powerful tools designed to handle any conversion task with ease.</p>

        <div className="features-grid">
          {features.map((f, i) => (
            <div className="feature-card" key={i} style={{ '--delay': `${i * 0.08}s` }}>
              <div className="feature-icon-bg">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-card">
          <div className="cta-orb" />
          <h2>Ready to Convert?</h2>
          <p>Join thousands of users who trust SmokeByte for their file conversions.</p>
          {user ? (
            <Link to="/dashboard" className="btn-primary-hero">Open Dashboard <FiArrowRight /></Link>
          ) : (
            <Link to="/signup" className="btn-primary-hero">Start for Free <FiArrowRight /></Link>
          )}
        </div>
      </section>
    </div>
  );
};

export default LandingPage;