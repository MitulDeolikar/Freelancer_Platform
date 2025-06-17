import React, { useState, useEffect } from 'react';
import './ProfileServices.css';
import ServiceCard from './ServiceCards';
import { FaTrashAlt } from 'react-icons/fa';

const ProfileServices = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [showModal, setShowModal] = useState(false);

  // Profile info state
  const [profile, setProfile] = useState({ firstName: '', lastName: '', email: '' });
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [profileError, setProfileError] = useState('');

  // Tag input state for categories
  const [categoryInput, setCategoryInput] = useState('');
  const [categories, setCategories] = useState([]);

  const [serviceTitle, setServiceTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const [services, setServices] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleAddServiceClick = () => {
    if (!isLoggedIn) {
      alert('Please log in to add a service.');
      return;
    }
    setShowModal(true);
  };
  const handleCancelClick = () => setShowModal(false);

  // Tag input handlers
  const handleCategoryInputChange = (e) => setCategoryInput(e.target.value);

  const handleCategoryInputKeyDown = (e) => {
    if (
      (e.key === 'Enter' || e.key === ',') &&
      categoryInput.trim() &&
      !categories.includes(categoryInput.trim())
    ) {
      e.preventDefault();
      setCategories([...categories, categoryInput.trim()]);
      setCategoryInput('');
    }
  };

  const handleRemoveCategory = (cat) => {
    setCategories(categories.filter((c) => c !== cat));
  };

  useEffect(() => {
    const fetchProfile = async () => {
      setLoadingProfile(true);
      setProfileError('');
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setIsLoggedIn(false);
          setProfileError('Log in to view Profile');
          setLoadingProfile(false);
          return;
        }
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!res.ok) {
          if (data.msg === 'Invalid token' || data.msg === 'No token') {
            setIsLoggedIn(false);
            setProfileError('Log in to view Profile');
          } else {
            setProfileError(data.msg || 'Failed to load profile');
          }
        } else {
          setProfile(data);
          setIsLoggedIn(true);
        }
      } catch (err) {
        setProfileError('Server error');
      }
      setLoadingProfile(false);
    };
    fetchProfile();
  }, []);

  const handleAddService = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please log in to add a service.');
      return;
    }
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/services`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          title: serviceTitle,
          skills: categories,
          description,
          price
        })
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.msg || 'Failed to add service');
        return;
      }
      // Optionally: refresh service list, close modal, reset fields
      setShowModal(false);
      setServiceTitle('');
      setCategories([]);
      setDescription('');
      setPrice('');
    } catch {
      alert('Server error');
    }
  };

  const handleDeleteService = async (serviceId) => {
    if (!window.confirm('Are you sure you want to delete this service?')) return;
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/services/${serviceId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        setServices(services.filter(s => s._id !== serviceId));
      } else {
        alert('Failed to delete service.');
      }
    } catch {
      alert('Failed to delete service.');
    }
  };

  useEffect(() => {
    if (activeTab === 'services' && isLoggedIn) {
      const fetchServices = async () => {
        const token = localStorage.getItem('token');
        try {
          const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/services/my`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          const data = await res.json();
          if (res.ok) setServices(data);
        } catch { }
      };
      fetchServices();
    }
  }, [activeTab, showModal, isLoggedIn]); // refetch when modal closes (after add)

  return (
    <div className="profile-services-box">
      <div className="tabs">
        <button
          className={activeTab === 'profile' ? 'active' : ''}
          onClick={() => setActiveTab('profile')}
        >
          Profile
        </button>
        <button
          className={activeTab === 'services' ? 'active' : ''}
          onClick={() => setActiveTab('services')}
        >
          My Services
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'profile' && (
          <div className="profile-tab">
            <h3>Profile Information</h3>
            {loadingProfile ? (
              <p>Loading...</p>
            ) : profileError ? (
              <p style={{ color: '#888', fontWeight: 500 }}>{profileError}</p>
            ) : (
              <>
                <label>First Name</label>
                <input type="text" placeholder="First Name" value={profile.firstName} readOnly />

                <label>Last Name</label>
                <input type="text" placeholder="Last Name" value={profile.lastName} readOnly />

                <label>Email</label>
                <input type="email" placeholder="Email" value={profile.email} readOnly />
              </>
            )}
          </div>
        )}

        {activeTab === 'services' && (
          <div className="services-tab">
            <div className="services-header">
              <h3>My Services</h3>
              <button
                className="add-service"
                onClick={handleAddServiceClick}
                disabled={!isLoggedIn}
                style={!isLoggedIn ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
              >
                + Add Service
              </button>
            </div>

            {showModal && (
              <div className="modal-overlay">
                <div className="modal-content">
                  <h3>Add New Service</h3>
                  <form onSubmit={handleAddService}>
                    {/* ...form fields as before... */}
                    {/* Category Tag Input */}
                    <div className="form-group">
                      <label>Service Title</label>
                      <select value={serviceTitle} onChange={e => setServiceTitle(e.target.value)} required>
                        <option value="">Select a service</option>
                        <option>Web Development</option>
                        <option>UI/UX Designer</option>
                        <option>Graphic Design</option>
                        <option>Digital Marketing</option>
                        <option>Technical Content Writing</option>
                        <option>Video & Animation</option>
                        <option>AI Services</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Skills/Technologies</label>
                      <div className="tag-input-wrapper">
                        <div className="tag-list">
                          {categories.map((cat) => (
                            <span className="tag-item" key={cat}>
                              {cat.toUpperCase()}
                              <button
                                type="button"
                                className="tag-remove"
                                onClick={() => handleRemoveCategory(cat)}
                                aria-label={`Remove ${cat}`}
                              >
                                ×
                              </button>
                            </span>
                          ))}
                        </div>
                        <input
                          type="text"
                          className="tag-input"
                          placeholder="Type and press Enter (e.g., SEO)"
                          value={categoryInput}
                          onChange={handleCategoryInputChange}
                          onKeyDown={handleCategoryInputKeyDown}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Description</label>
                      <textarea
                        placeholder="Describe what you will deliver..."
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Price (₹)</label>
                      <input
                        type="number"
                        placeholder="5000"
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                        required
                      />
                    </div>
                    <div className="modal-buttons">
                      <button className="submit-btn" type="submit">Add Service</button>
                      <button className="cancel-btn" type="button" onClick={handleCancelClick}>Cancel</button>
                    </div>
                  </form>
                </div>
              </div>
            )}
            <div className="service-list">
              {!isLoggedIn ? (
                <p style={{ color: '#888', margin: '2rem 0' }}>Log in to view your services.</p>
              ) : services.length === 0 ? (
                <p style={{ color: '#888', margin: '2rem 0' }}>No services added yet.</p>
              ) : (
                services.map(service => (
                  <div key={service._id} style={{ position: 'relative' }}>
                    <ServiceCard
                      title={service.title}
                      description={service.description}
                      skills={service.skills}
                      price={service.price}
                    />
                    <button
                      className="delete-service-btn"
                      title="Delete Service"
                      onClick={() => handleDeleteService(service._id)}
                      style={{
                        position: 'absolute',
                        top: 18,
                        right: 18,
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#888',
                        padding: 0
                      }}
                    >
                      <FaTrashAlt size={20} />
                    </button>
                  </div>

                ))
              )}

            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileServices;