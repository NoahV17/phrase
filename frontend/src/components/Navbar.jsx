import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="navbar-brand">phrase</Link>
        <button 
          className={`navbar-toggler ${menuOpen ? 'active' : ''}`} 
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <div className={`navbar-collapse ${menuOpen ? 'show' : ''}`}>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link 
                to="/" 
                className={`nav-link ${isActive('/') ? 'active' : ''}`} 
                onClick={() => setMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/lessons" 
                className={`nav-link ${isActive('/lessons') ? 'active' : ''}`} 
                onClick={() => setMenuOpen(false)}
              >
                My Lessons
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/transcribe" 
                className={`nav-link ${isActive('/transcribe') ? 'active' : ''}`} 
                onClick={() => setMenuOpen(false)}
              >
                Common Phrases
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
