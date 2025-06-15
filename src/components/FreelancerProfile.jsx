import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './FreelancerProfile.css';
import Footer from './Footer';
import Navbar from './Navbar';
import { FaCheckCircle } from 'react-icons/fa';

const FreelancerProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showSuccess, setShowSuccess] = useState(false);
    const razorpayKeyId = process.env.REACT_APP_RAZORPAY_KEY_ID;

    useEffect(() => {
        const fetchProfileAndServices = async () => {
            try {
                const userRes = await fetch(`http://localhost:5000/api/auth/user/${id}`);
                const userData = await userRes.json();

                const servicesRes = await fetch(`http://localhost:5000/api/services?user=${id}`);
                const servicesData = await servicesRes.json();

                setUser(userData);
                setServices(servicesData);
            } catch {
                setUser(null);
                setServices([]);
            }
            setLoading(false);
        };
        fetchProfileAndServices();
    }, [id]);

    const handlePayment = async (price, serviceId) => {
        try {
            const res = await fetch('http://localhost:5000/api/payment/order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount: price, currency: 'INR', receipt: serviceId })
            });
            const data = await res.json();

            const options = {
                key: razorpayKeyId,
                amount: data.amount,
                currency: data.currency,
                name: "YourBuddy",
                description: "Service Payment",
                order_id: data.id,
                handler: function (response) {
                    fetch('http://localhost:5000/api/payment/record', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + localStorage.getItem('token')
                        },
                        body: JSON.stringify({
                            amount: price,
                            serviceId: serviceId,
                            razorpayPaymentId: response.razorpay_payment_id
                        })
                    }).then(() => {
                        setShowSuccess(true);
                    });
                },
                prefill: {
                    name: user.firstName + " " + user.lastName,
                    email: user.email
                },
                theme: { color: "#3399cc" },
                method: {
                    upi: true,
                    card: true,
                    netbanking: true,
                    wallet: true
                }
            };

            const razorpay = new window.Razorpay(options);
            razorpay.open();
        } catch (err) {
            console.error(err);
            alert('Payment initiation failed.');
        }
    };


    if (loading) return <div>Loading...</div>;
    if (!user) return <div>User not found</div>;

    return (
        <>
            <Navbar />
            <div className="freelancer-profile">
                <div className="profile-box">
                    <div className="profile-header">
                        <button className="back-btn" onClick={() => navigate('/freelancers')}>←</button>
                        <h1>{user.firstName} {user.lastName}</h1>
                    </div>
                    <div className="skills">
                        {user.skills && user.skills.map((skill) => (
                            <span key={skill} className="skill-tag">{skill}</span>
                        ))}
                    </div>
                </div>

                <div className="service-box">
                    <h2>Services Offered</h2>
                    {services.length === 0 ? (
                        <p>No services found.</p>
                    ) : (
                        services.map(service => (
                            <div className="service-card" key={service._id}>
                                <h3>{service.title}</h3>
                                <p className="description">{service.description}</p>
                                <div className="freelancer-tags">
                                    {service.skills.map((tag, idx) => (
                                        <span className="freelancer-tag" key={idx}>{tag}</span>
                                    ))}
                                </div>
                                <div className="bottom-row">
                                    <span className="price">₹{service.price}</span>
                                    <button
                                        className="proceed-btn"
                                        onClick={() => {
                                            if (!localStorage.getItem('token')) {
                                                alert('Please log in to proceed with payment.');
                                                return;
                                            }
                                            handlePayment(service.price, service._id);
                                        }}
                                        disabled={!localStorage.getItem('token')}
                                        style={!localStorage.getItem('token') ? { opacity: 0.6, cursor: 'not-allowed' } : {}}
                                    >
                                        Proceed to Pay
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {showSuccess && (
                    <div className="payment-success-popup">
                        <div className="popup-content">
                            <div className="success-icon-wrapper">
                                <FaCheckCircle className="success-icon" />
                            </div>
                            <h2>Payment Successful!</h2>
                            <p>Your payment was successful. <br />You can view your order in the <b>Orders</b> page.</p>
                            <button onClick={() => setShowSuccess(false)}>Close</button>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
};

export default FreelancerProfile;