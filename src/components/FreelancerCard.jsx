import React from 'react';
import { useNavigate } from 'react-router-dom';
import './FreelancerCard.css';

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

const getInitials = (name) => {
  const parts = name.trim().split(' ');
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

const getRandomGradient = (name) => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash += name.charCodeAt(i);
  return gradients[hash % gradients.length];
};

const FreelancerCard = ({ name, role, description, price, tags, serviceId ,userId}) => {
  const navigate = useNavigate();

  const handleHireNow = () => {
  // Navigate to freelancer profile page
  if (userId) {
    navigate(`/freelancers/profile/${userId}`);
  }
};

  return (
    <div className="freelancer-card">
      <div
        className="freelancer-avatar"
        style={{ background: getRandomGradient(name) }}
      >
        {getInitials(name)}
      </div>
      <div className="freelancer-info">
        <h3>{name}</h3>
        <div className="freelancer-role">{role}</div>
        <p className="freelancer-desc">{description}</p>
        <div className="freelancer-tags">
          {tags.map((tag, idx) => (
            <span className="freelancer-tag" key={idx}>{tag}</span>
          ))}
        </div>
        <div className="freelancer-price">₹{price}</div>
        <button className="hire-btn" onClick={handleHireNow}>Hire Now</button>
      </div>
    </div>
  );
};

export default FreelancerCard;