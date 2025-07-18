import React, { useEffect, useState } from 'react';
import './WalletPage.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

const WalletPage = () => {
    const [user, setUser] = useState(null);
    const [earnings, setEarnings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalEarnings, setTotalEarnings] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            setUser(null);
            setLoading(false);
            return;
        }

        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/me`, {
            headers: { Authorization: 'Bearer ' + token }
        })
            .then(res => res.json())
            .then(userData => {
                setUser(userData);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!user || !user._id || !token) return;

        setLoading(true);
        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/payment/my-earnings`, {
            headers: { Authorization: 'Bearer ' + token }
        })
            .then(res => res.json())
            .then(data => {
                console.log("Fetched earnings:", data); // ✅ Debug log
                setEarnings(data);
                const total = data.reduce((sum, payment) => sum + payment.amount, 0);
                setTotalEarnings(total);
                setLoading(false);
            })
            .catch(err => {
                console.error("Earnings fetch failed:", err);
                setLoading(false);
            });
    }, [user]);


    return (
        <div>
            <Navbar />
            <div className="wallet-page">
                <h2 className="wallet-title">My Wallet</h2>
                {loading ? (
                    <p className="wallet-loading">Loading...</p>
                ) : !user ? (
                    <div className="wallet-login-prompt">
                        <p>You must be logged in to view your wallet.</p>
                        <button className="wallet-login-btn" onClick={() => navigate('/auth')}>
                            Log In
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="wallet-summary">
                            <h3>Total Earnings:</h3>
                            <span className="wallet-total">₹{totalEarnings}</span>
                        </div>
                        {earnings.length === 0 ? (
                            <p className="wallet-empty">No one has hired you yet.</p>
                        ) : (
                            <div className="wallet-list">
                                {earnings.map((order, index) => (
                                    <div className="wallet-card" key={index}>
                                        <div className="wallet-info">
                                            <p><strong>Hired By:</strong> {order.paidBy?.firstName} {order.paidBy?.lastName}</p>
                                            <p><strong>Service:</strong> {order.service?.title}</p>
                                            <p><strong>Amount:</strong> ₹{order.amount}</p>
                                            <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default WalletPage;