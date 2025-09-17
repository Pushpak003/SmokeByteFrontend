// src/components/layout/Header.jsx

import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth"; // Import useAuth hook
import { FiLogOut } from "react-icons/fi";
import "./Header.css";

const Header = () => {
  const { user, logout } = useAuth(); // Get user and logout function from context
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="header">
      <Link to="/" className="logo">
        <img src="/Logo1.png" alt="SmokeByte Logo" className="logo-image" />
        SmokeByte
      </Link>
      <nav className="main-nav">
        {user ? (
          // --- Logged-in User View ---
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/history">History</Link>
            <button onClick={handleLogout} className="btn-logout">
              <FiLogOut /> Logout
            </button>
          </>
        ) : (
          // --- Logged-out User View ---
          <>
            <Link to="/#features">Features</Link>
            <Link to="/formats">Supported Formats</Link>
            <Link to="/login" className="btn-login">
              Login
            </Link>
            <Link to="/signup" className="btn-signup">
              Sign Up
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
