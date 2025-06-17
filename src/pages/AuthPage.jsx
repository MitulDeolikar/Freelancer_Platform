import React, { useState } from 'react';
import './AuthPage.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        if (!isLogin && password !== confirmPassword) {
            setError("Passwords do not match");
            setLoading(false);
            return;
        }

        try {
            const res = await fetch(
                isLogin
                    ? `${process.env.REACT_APP_BACKEND_URL}/api/auth/login`
                    : `${process.env.REACT_APP_BACKEND_URL}/api/auth/register`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(
                        isLogin
                            ? { email, password }
                            : { firstName, lastName, email, password }
                    ),
                }
            );
            const data = await res.json();
            if (!res.ok) {
                setError(data.msg || 'Something went wrong');
                setLoading(false);
                return;
            }
            if (isLogin) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user)); // <-- Save user info
                window.location.href = '/';
            } else {
                setIsLogin(true);
                setSuccess('Registration successful! Please login.');
            }
        } catch (err) {
            setError('Server error');
        }
        setLoading(false);
    };

    return (
        <>
            <Navbar />
            <div className="auth-container">
                <div className="auth-box">
                    <div className="auth-toggle">
                        <button onClick={() => setIsLogin(true)} className={isLogin ? 'active' : ''}>Login</button>
                        <button onClick={() => setIsLogin(false)} className={!isLogin ? 'active' : ''}>Sign Up</button>
                    </div>

                    <h2>{isLogin ? 'Welcome Back' : 'Create an Account'}</h2>
                    <p>{isLogin ? 'Sign in to your account' : 'Sign up to get started'}</p>

                    <form className="auth-form" onSubmit={handleSubmit}>
                        {!isLogin && (
                            <>
                                <input type="text" placeholder="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} required />
                                <input type="text" placeholder="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} required />
                            </>
                        )}

                        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
                        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />

                        {!isLogin && (
                            <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
                        )}

                        <button type="submit" className="submit-btn" disabled={loading}>
                            {loading ? 'Please wait...' : isLogin ? 'Sign In' : 'Sign Up'}
                        </button>
                        {error && <div className="auth-message error">{error}</div>}
                        {success && <div className="auth-message success">{success}</div>}
                    </form>

                    
                </div>
            </div>
            <Footer />
        </>
    );
};

export default AuthPage;