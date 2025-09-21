// src/components/layout/Footer.jsx
import { Link } from 'react-router-dom';
import './Footer.css'; // We'll create this file next

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} SmokeByte. All Rights Reserved.</p>
        <p> By Pushpakk😎 </p>
      <nav>
        <Link to="/privacy">Privacy Policy</Link>
        <Link to="/terms">Terms of Service</Link>
      </nav>
    </footer>
  );
};

export default Footer;