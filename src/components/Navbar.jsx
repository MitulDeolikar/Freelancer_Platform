import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';
import '../index.css';
import { FiUser, FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleProfile = () => {
    if (!token) {
      navigate('/auth');
      return;
    }
    setProfileOpen(!profileOpen);
  };
  const closeMenu = () => setMenuOpen(false);

  const handleAuthClick = () => {
    navigate('/auth');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-left">
        <Link className='logo-link' to="/">
          <span className="logo-text" >YourBuddy <span className='logo-dot'>.</span></span>
        </Link>
      </div>

      <ul className={`navbar-links ${menuOpen ? 'open' : ''}`}>
        <li><Link to="/" className={location.pathname === "/" ? "active" : ""} onClick={closeMenu}>Home</Link></li>
        <li><Link to="/about" className={location.pathname === "/about" ? "active" : ""} onClick={closeMenu}>About</Link></li>
        <li><Link to="/freelancers" className={location.pathname === "/freelancers" ? "active" : ""} onClick={closeMenu}>Browse Freelancers</Link></li>
        <li><Link to="/dashboard" className={location.pathname === "/dashboard" ? "active" : ""} onClick={closeMenu}>My Dashboard</Link></li>
        <li><Link to="/orders" className={location.pathname === "/orders" ? "active" : ""} onClick={closeMenu}>Orders</Link></li>
        <li className="mobile-login-btn">
          {token ? (
            <button className="enter-btn" onClick={handleLogout}>Logout</button>
          ) : (
            <button className="enter-btn" onClick={handleAuthClick}>Login / Sign Up</button>
          )}
        </li>
      </ul>

      <div className="navbar-right">
        {token ? (
          <button className="enter-btn desktop-only" onClick={handleLogout}>Logout</button>
        ) : (
          <button className="enter-btn desktop-only" onClick={handleAuthClick}>Login / Sign Up</button>
        )}

        <div className="profile-container">
          <div className="user-icon" onClick={toggleProfile}>
            <FiUser size={20} color={isScrolled ? 'white' : '#111827'} />
          </div>
          {profileOpen && user && (
            <div className="user-dropdown">
              <p className="username">{user.firstName} {user.lastName}</p>
              <p className="email">{user.email}</p>
            </div>
          )}
        </div>

        <button className="menu-toggle" onClick={toggleMenu}>
          {menuOpen
            ? <FiX size={22} color={isScrolled ? 'white' : '#111827'} />
            : <FiMenu size={22} color={isScrolled ? 'white' : '#111827'} />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;