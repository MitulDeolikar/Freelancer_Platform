import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProfileServices from '../components/ProfileServices';

const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <ProfileServices />
      <Footer />
    </div>
  );
};

export default Dashboard;
