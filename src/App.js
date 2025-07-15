  // src/App.js
  import React from 'react';
  import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
  import './App.css';
  import HomePage from './pages/HomePage';
  import AboutPage from './pages/AboutPage';
  import BrowsePage from './pages/BrowsePage';
  import Dashboard from './pages/Dashboard';
  import FreelancerProfile from './components/FreelancerProfile';
  import AuthPage from './pages/AuthPage';
  import OrdersPage from './pages/OrdersPage';
  import WalletPage from './pages/WalletPage';

  function App() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/freelancers" element={<BrowsePage/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/freelancers/profile/:id" element={<FreelancerProfile />} />
          <Route path="/auth" element={<AuthPage/>} />
          <Route path="/orders" element={<OrdersPage/>} />
          <Route path="/wallet" element={<WalletPage/>} />
          
          
        </Routes>
      </Router>
    );
  }

  export default App;
