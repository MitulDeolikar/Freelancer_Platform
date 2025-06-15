import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom'
import './Orders.css'

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            setUser(null);
            setLoading(false);
            return;
        }

        fetch('http://localhost:5000/api/auth/me', {
            headers: { Authorization: 'Bearer ' + token }
        })
            .then(res => res.json())
            .then(userData => {
                setUser(userData);
                return fetch('http://localhost:5000/api/payment/my-orders', {
                    headers: { Authorization: 'Bearer ' + token }
                });
            })
            .then(res => res && res.json())
            .then(orderData => {
                if (orderData) setOrders(orderData);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    return (
        <div>
            <Navbar />
            <div className="orders-page">
                <h2 className="orders-title">My Orders</h2>
                {loading ? (
                    <p className="orders-loading">Loading...</p>
                ) : !user ? (
                    <div className="orders-login-prompt">
                        <p>Log In to view your orders.</p>
                        <button className="orders-login-btn" onClick={() => navigate('/auth')}>Log In</button>
                    </div>
                ) : orders.length === 0 ? (
                    <p className="orders-empty">You have no orders yet.</p>
                ) : (
                    <div className="orders-list">
                        {orders.map(order => (
                            <div className="order-card" key={order._id}>
                                <div className="order-info">
                                    <div>
                                        <span className="order-label">Service:</span> {order.service?.title || 'N/A'}
                                    </div>
                                    <div>
                                        <span className="order-label">Paid To:</span> {order.paidTo?.firstName} {order.paidTo?.lastName}
                                    </div>
                                    <div>
                                        <span className="order-label">Amount:</span> ₹{order.amount}
                                    </div>
                                    <div>
                                        <span className="order-label">Date:</span> {new Date(order.createdAt).toLocaleString()}
                                    </div>
                                    
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    )
}

export default OrdersPage