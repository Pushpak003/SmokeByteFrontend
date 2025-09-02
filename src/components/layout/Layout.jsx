// src/components/layout/Layout.jsx

import { Outlet } from 'react-router-dom';
import Header from './Header.jsx';
import Footer from './Footer.jsx';

const Layout = () => {
  return (
    <div className="app-container">
      <Header />
      <main>
        <Outlet /> {/* This will render the current page */}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;