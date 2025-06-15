// src/pages/AboutPage.jsx
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import team from '../assets/team.jpg'; // Ensure this path is correct   
import './About.css';

const AboutPage = () => {
    return (
        <>
            <Navbar />
            <div className="about-container">
                <section className="mission-section">
                    <div className="mission-text">
                        <h2>Our Mission</h2>
                        <p>
                            We believe that talent knows no boundaries. Our mission is to create a world where anyone, anywhere can build a thriving career doing what they love.
                        </p>
                        <p>
                            By connecting skilled freelancers with businesses that need their expertise, we're not just facilitating transactions – we're building relationships, fostering growth, and creating opportunities for everyone involved.
                        </p>
                    </div>
                    <div className="mission-image">
                        <img src={team} alt="Team working" />
                    </div>
                </section>

                <section className="stats-section">
                    <h2>FreeLance by the Numbers</h2>
                    <p>Building a global community of freelancers and businesses</p>
                    <div className="stats-grid">
                        <div className="stat-item">
                            <div className="stat-icon">👥</div>
                            <h3>50,000+</h3>
                            <p>Active Freelancers</p>
                        </div>
                        <div className="stat-item">
                            <div className="stat-icon">🏅</div>
                            <h3>1M+</h3>
                            <p>Projects Completed</p>
                        </div>
                        <div className="stat-item">
                            <div className="stat-icon">🌐</div>
                            <h3>150+</h3>
                            <p>Trusted Partners</p> {/* Updated text here */}
                        </div>
                        <div className="stat-item">
                            <div className="stat-icon">🛡️</div>
                            <h3>98%</h3>
                            <p>Success Rate</p>
                        </div>
                    </div>
                </section>
                <section className="values-section">
                    <h2>Our Values</h2>
                    <p className="values-subtitle">The principles that guide everything we do</p>
                    <div className="values-card-grid">
                        <div className="value-card">
                            <div className="card-icon" style={{ backgroundColor: "#e0f7e9" }}>🤝</div>
                            <h3>Trust</h3>
                            <p>
                                We believe trust is the foundation of meaningful work relationships. Our platform promotes transparency,
                                honors commitments, and encourages open communication—ensuring that both freelancers and clients feel
                                safe, valued, and respected throughout every project.
                            </p>
                        </div>
                        <div className="value-card">
                            <div className="card-icon" style={{ backgroundColor: "#f0e8ff" }}>🚀</div>
                            <h3>Innovation</h3>
                            <p>
                                We constantly evolve by embracing new technologies and ideas. From intuitive tools to seamless workflows,
                                we’re dedicated to building smart, scalable solutions that empower our users and stay ahead of industry trends.
                                Innovation drives everything we do.
                            </p>
                        </div>
                        <div className="value-card">
                            <div className="card-icon" style={{ backgroundColor: "#fff9db" }}>🌍</div>
                            <h3>Inclusion</h3>
                            <p>
                                Our global community thrives on diversity. We welcome people of all backgrounds, experiences, and cultures.
                                Inclusion means creating a level playing field where everyone has the opportunity to grow, succeed, and
                                contribute to something bigger—together.
                            </p>
                        </div>
                    </div>
                </section>

            </div>
            <Footer />
        </>
    );
};

export default AboutPage;
