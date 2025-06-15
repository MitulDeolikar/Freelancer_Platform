// src/pages/HomePage.jsx
import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Categories from '../components/Categories';
import Featured from '../components/Featured';
import '../index.css';
import './Home.css'; // <-- Add this line for custom Home styles
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Categories />
      <Featured />

      {/* CTA Section */}
      <section className="cta-section">
        <h2 className="cta-title">Ready to Start Your Next Project?</h2>
        <p className="cta-subtitle">
          Join thousands of satisfied clients who found their perfect freelancer
        </p>
        <div className="cta-buttons">
          <Link to="/dashboard"><button className="cta-btn filled">Post a Project</button></Link>
          <Link to="/freelancers"><button className="cta-btn outlined">Browse Freelancers</button></Link>
        </div>
      </section>
      <Footer/>
    </>
  );
};

export default HomePage;
