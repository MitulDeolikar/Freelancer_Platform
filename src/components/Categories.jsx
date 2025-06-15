import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Categories.css';
import { FiArrowRight } from 'react-icons/fi';

const categories = [
  { icon: '💻', title: 'Web Development', count: '1,700+' },
  { icon: '🎨', title: 'Graphic Design', count: '300+' },
  { icon: '📝', title: 'Technical Content Writing', count: '200+' },
  { icon: '📈', title: 'Digital Marketing', count: '300+' },
  { icon: '🎞️', title: 'Video Animations', count: '400+' },
  { icon: '👤', title: 'UI/UX Designing', count: '500+' },
];

const Categories = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
  }, []);

  const handleCategoryClick = (cat) => {
    navigate('/freelancers', { state: { category: cat.title } });
  };

  return (
    <section
      ref={sectionRef}
      className={`categories-section ${isVisible ? 'fade-in' : 'hidden'}`}
    >
      <h2 className="categories-title">Browse by Category</h2>
      <p className="categories-subtitle">Find the perfect freelancer for your project</p>

      <div className="categories-grid">
        {categories.map((cat, index) => (
          <div
            className="category-card"
            key={index}
            onClick={() => handleCategoryClick(cat)}
            style={{ cursor: 'pointer' }}
          >
            <div className="category-icon">{cat.icon}</div>
            <div className="category-info">
              <h3>{cat.title}</h3>
              <p>{cat.count} freelancers</p>
            </div>
            <div className="category-arrow">
              <FiArrowRight size={18} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;