import React, { useState } from 'react';
import './Hero.css';
import { FiSearch } from 'react-icons/fi';
import { ReactTyped } from 'react-typed';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate('/freelancers', { state: { search } });
    } else {
      navigate('/freelancers');
    }
  };

  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1>
          Hire the Best <span className="highlight">
            <ReactTyped
              strings={['Freelancers', 'Professionals', 'Experts']}
              typeSpeed={80}
              backSpeed={70}
              loop
            />
          </span><br />
          for Your Tasks
        </h1>
        <p>Connect with skilled professionals who can bring your ideas to life</p>

        <form className="search-bar" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search for services, skills, or freelancers..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <button className="search-btn" type="submit">
            <FiSearch />
          </button>
        </form>

        <div className="popular-searches" onClick={handleSearch}>
          <span>Popular searches:</span>
          <div className="tags">
            <button>Website Design</button>
            <button>Logo Creation</button>
            <button>SEO</button>
            <button>Mobile App</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;