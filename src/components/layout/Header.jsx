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
        <img src="/Logo1.png" alt="SmokeByte Logo" className="logo-image" />
        SmokeByte
      </Link>

      <button className="mobile-nav-toggle" onClick={() => setIsMenuOpen(o => !o)} aria-label="Toggle menu">
        <span className="icon-bar" />
        <span className="icon-bar" />
        <span className="icon-bar" />
      </button>

      <nav className={`main-nav ${isMenuOpen ? 'is-open' : ''}`}>
        {user ? (
          <>
            <NavLink to="/dashboard" onClick={closeMenu}>Dashboard</NavLink>
            <NavLink to="/history"   onClick={closeMenu}>History</NavLink>
            <ServerStatusBadge />
            <button onClick={handleLogout} className="btn-logout">
              <FiLogOut size={14} /> Logout
            </button>
          </>
        ) : (
          <>
            <NavLink to="/formats"  onClick={closeMenu}>Formats</NavLink>
            <ServerStatusBadge />
            <NavLink to="/login"    className="btn-login"  onClick={closeMenu}>Login</NavLink>
            <Link    to="/signup"   className="btn-signup" onClick={closeMenu}>Sign Up</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;