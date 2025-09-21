
import { useState } from "react"; // Step 1: Import useState
import { NavLink,Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { FiLogOut } from "react-icons/fi";
import "./Header.css";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); 
  };
  

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    closeMenu(); // Close menu on logout
    navigate("/login");
  };

  return (
    <header className="header">
      <Link to="/" className="logo" onClick={closeMenu}>
        <img src="/Logo1.png" alt="SmokeByte Logo" className="logo-image" />
        SmokeByte
      </Link>

      {/* Step 3: Add the hamburger button for mobile view */}
      <button className="mobile-nav-toggle" onClick={toggleMenu}>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
      </button>

      {/* Step 4: Apply dynamic class based on state */}
      <nav className={`main-nav ${isMenuOpen ? "is-open" : ""}`}>
        {user ? (
          // --- Logged-in User View ---
          <>
            <NavLink to="/dashboard" onClick={closeMenu}>Dashboard</NavLink>
            <NavLink to="/history" onClick={closeMenu}>History</NavLink>
            <button onClick={handleLogout} className="btn-logout">
              <FiLogOut /> Logout
            </button>
          </>
        ) : (
          // --- Logged-out User View ---
          <>
            <Link to="/#features" onClick={closeMenu}>Features</Link>
            <NavLink to="/formats" onClick={closeMenu}>Supported Formats</NavLink>
            <NavLink to="/login" className="btn-login" onClick={closeMenu}>
              Login
            </NavLink>
            <Link to="/signup" className="btn-signup" onClick={closeMenu}>
              Sign Up
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
