import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FreelancerCard from '../components/FreelancerCard';
import './Browse.css';

const categoryOptions = [
  "All Categories",
  "Web Development",
  "UI/UX Designer",
  "Graphic Design",
  "Digital Marketing",
  "Technical Content Writing",
  "Video & Animation",
  "AI Services"
];

const BrowsePage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All Categories');
  const [sort, setSort] = useState('Sort by');
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Fetch logged-in user info
    const token = localStorage.getItem('token');
    if (token) {
      fetch('http://localhost:5000/api/auth/profile', {
        headers: { Authorization: 'Bearer ' + token }
      })
        .then(res => res.json())
        .then(user => setUserId(user._id))
        .catch(() => setUserId(null));
    }
  }, []);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/services');
        const data = await res.json();
        setServices(data);
      } catch {
        setServices([]);
      }
      setLoading(false);
    };
    fetchServices();
  }, []);

  // Filtering and sorting logic
  const filteredServices = services
    .filter(service => {
      // Hide own services
      if (userId && service.user && service.user._id === userId) return false;
      // Category filter
      if (category !== 'All Categories' && service.title !== category) return false;
      // Search filter (name, title, skills)
      const searchLower = search.toLowerCase();
      const name = service.user ? `${service.user.firstName} ${service.user.lastName}` : '';
      const inName = name.toLowerCase().includes(searchLower);
      const inTitle = service.title.toLowerCase().includes(searchLower);
      const inSkills = service.skills.some(skill => skill.toLowerCase().includes(searchLower));
      return !search || inName || inTitle || inSkills;
    })
    .sort((a, b) => {
      if (sort === 'Price: High to Low') return b.price - a.price;
      if (sort === 'Price: Low to High') return a.price - b.price;
      return 0;
    });

  return (
    <div>
      <Navbar />

      <div className="browse-container">
        <h2>Browse Freelancers</h2>
        <p>Find the perfect freelancer for your project</p>

        <div className="filter-bar">
          <input
            type="text"
            className="search-input"
            placeholder="🔍 Search freelancers, skills, or services..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />

          <select
            className="dropdown"
            value={category}
            onChange={e => setCategory(e.target.value)}
          >
            {categoryOptions.map(opt => (
              <option key={opt}>{opt}</option>
            ))}
          </select>

          <select
            className="dropdown"
            value={sort}
            onChange={e => setSort(e.target.value)}
          >
            <option>Sort by</option>
            <option>Price: High to Low</option>
            <option>Price: Low to High</option>
          </select>
        </div>

        {/* ✅ Freelancer Cards */}
        <div className="card-list">
          {loading ? (
            <p>Loading services...</p>
          ) : filteredServices.length === 0 ? (
            <p>No services found.</p>
          ) : (
            filteredServices.map(service => (
              <FreelancerCard
                key={service._id}
                name={
                  service.user
                    ? `${service.user.firstName} ${service.user.lastName}`
                    : 'Unknown User'
                }
                role={service.title}
                description={service.description}
                price={service.price}
                tags={service.skills}
                serviceId={service._id}
                userId={service.user ? service.user._id : null}
              />
            ))
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BrowsePage;