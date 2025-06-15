import React from 'react';
import './Footer.css';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-section about">
          <div className="logo">

            <span className="logo-text">YourBuddy <span className="logo-dot">.</span></span>
          </div>
          <p>Connecting talented freelancers with businesses worldwide. Build your dream project today.</p>
          <div className="social-icons">
            <FaFacebookF />
            <FaTwitter />
            <FaInstagram />
            <FaLinkedinIn />
          </div>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Home</Link>
            </li>
            <li>
              <Link to="/about" style={{ textDecoration: 'none', color: 'inherit' }}>About Us</Link>
            </li>
            <li>
              <Link to="/freelancers" style={{ textDecoration: 'none', color: 'inherit' }}>Browse Freelancers</Link>
            </li>
            <li>
              <Link to="/dashboard" style={{ textDecoration: 'none', color: 'inherit' }}>Dashboard</Link>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Categories</h4>
          <ul>
            <Link to="/freelancers" style={{ textDecoration: 'none', color: 'inherit' }} ><li>Web Development</li></Link>
            <Link to="/freelancers" style={{ textDecoration: 'none', color: 'inherit' }} ><li>Graphic Design</li></Link>
            <Link to="/freelancers" style={{ textDecoration: 'none', color: 'inherit' }} ><li>Content Writing</li></Link>
            <Link to="/freelancers" style={{ textDecoration: 'none', color: 'inherit' }} ><li>Digital Marketing</li></Link>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact Us</h4>
          <ul className="contact-info">
            <li><MdEmail /> support@yourbuddy.com</li>
            <li><MdPhone /> +91 7021XXXXXX</li>
            <li><MdLocationOn /> Pune, India</li>
          </ul>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© 2025 YourBuddy. All rights reserved.</p>
        <div className="footer-links">
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
          <span>Cookie Policy</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
