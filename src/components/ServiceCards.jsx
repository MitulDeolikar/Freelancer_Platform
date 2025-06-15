import React from 'react';
import './ServiceCard.css'; // (optional, for custom styles)

const ServiceCard = ({ title, description, skills, price }) => (
  <div className="service-card">
    <h3 className="service-title">{title}</h3>
    <p className="service-description">{description}</p>
    <div className="service-skills">
      {skills.map((skill, idx) => (
        <span className="service-skill" key={idx}>{skill}</span>
      ))}
    </div>
    <div className="service-price">₹{price}</div>
  </div>
);

export default ServiceCard;