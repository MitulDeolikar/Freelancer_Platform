import React, { useEffect, useState } from 'react';
import './Featured.css';
import { useNavigate } from 'react-router-dom';

// Gradients for avatar backgrounds
const gradients = [
  "linear-gradient(135deg, #6366f1, #60a5fa)",
  "linear-gradient(135deg, #f472b6, #fbbf24)",
  "linear-gradient(135deg, #34d399, #60a5fa)",
  "linear-gradient(135deg, #f87171, #f472b6)",
  "linear-gradient(135deg, #a78bfa, #f472b6)",
  "linear-gradient(135deg, #fbbf24, #34d399)",
  "linear-gradient(135deg, #60a5fa, #a78bfa)",
  "linear-gradient(135deg, #f472b6, #a78bfa)",
  "linear-gradient(135deg, #34d399, #f87171)",
  "linear-gradient(135deg, #a78bfa, #fbbf24)",
  "linear-gradient(135deg, #f87171, #6366f1)",
];

// Get initials from name
const getInitials = (firstName, lastName) => {
  return (
    (firstName?.[0] || '').toUpperCase() +
    (lastName?.[0] || '').toUpperCase()
  );
};

// Get a random gradient based on name
const getRandomGradient = (name) => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash += name.charCodeAt(i);
  return gradients[hash % gradients.length];
};

const Featured = () => {
  const [topFreelancers, setTopFreelancers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch payments and aggregate by paidTo
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/payment/top-freelancers`)
      .then(res => res.json())
      .then(data => setTopFreelancers(data))
      .catch(() => setTopFreelancers([]));
  }, []);

  return (
    <section className="featured-section">
      <h2 className="featured-title">Most Hired Freelancers</h2>
      <p className="featured-subtitle">Top professionals with the most hires</p>
      <div className="featured-grid">
        {topFreelancers.length === 0 ? (
          <p>No data available.</p>
        ) : (
          topFreelancers.slice(0,3).map((freelancer, index) => (
            <div className="freelancer-card" key={freelancer._id}>
              <div className="freelancer-main">
                <div
                  className="freelancer-image"
                  style={{
                    background: getRandomGradient(
                      `${freelancer.firstName} ${freelancer.lastName}`
                    ),
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: 32,
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                  }}
                >
                  {getInitials(freelancer.firstName, freelancer.lastName)}
                </div>
                <div className="freelancer-info">
                  <h3 className="freelancer-name">
                    {freelancer.firstName} {freelancer.lastName}
                  </h3>
                  <p className="freelancer-title">{freelancer.title || 'Freelancer'}</p>
                  <div className="freelancer-rating">
                    
                    <span className="review-text">
                      <strong>{freelancer.hireCount}</strong> times hired
                    </span>
                  </div>
                  <p className="freelancer-rate">
                    {freelancer.rate ? `₹${freelancer.rate}/-` : ''}
                  </p>
                </div>
              </div>
              <button
                className="profile-btn"
                onClick={() => navigate(`/freelancers/profile/${freelancer._id}`)}
              >
                View Profile
              </button>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default Featured;