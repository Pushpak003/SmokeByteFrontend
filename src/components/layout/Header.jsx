import { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { FiLogOut } from 'react-icons/fi';
import ServerStatusBadge from '../ui/ServerStatusBadge';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = () => {
    logout();
    closeMenu();
    navigate('/login');
  };

  return (
    <header className="header">
      <Link to="/" className="logo" onClick={closeMenu}>
        <img src="/logo.png" alt="SmokeByte" className="logo-image" />
        <span className="logo-text">SmokeByte</span>
      </Link>

      <button
        className={`mobile-nav-toggle ${isMenuOpen ? 'is-active' : ''}`}
        onClick={() => setIsMenuOpen((o) => !o)}
        aria-label="Toggle menu"
        aria-expanded={isMenuOpen}
      >
        <span className="icon-bar" />
        <span className="icon-bar" />
        <span className="icon-bar" />
      </button>

      <nav className={`main-nav ${isMenuOpen ? 'is-open' : ''}`}>
        {user ? (
          <>
            <NavLink to="/dashboard" onClick={closeMenu}>Dashboard</NavLink>
            <NavLink to="/history" onClick={closeMenu}>History</NavLink>
            <ServerStatusBadge />
            <span className="nav-divider" />
            <button onClick={handleLogout} className="btn-logout">
              <FiLogOut size={14} /> Logout
            </button>
          </>
        ) : (
          <>
            <NavLink to="/formats" onClick={closeMenu}>Formats</NavLink>
            <ServerStatusBadge />
            <span className="nav-divider" />
            <NavLink to="/login" className="btn-login" onClick={closeMenu}>Login</NavLink>
            <Link to="/signup" className="btn-signup" onClick={closeMenu}>Sign Up</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;