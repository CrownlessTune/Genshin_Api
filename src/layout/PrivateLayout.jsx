import React from 'react';
import PrivateNavBar from '../components/PrivateNavBar';
import Footer from '../components/Footer';

const PrivateLayout = ({ children, mainStyle, username, onLogout }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <PrivateNavBar username={username} onLogout={onLogout} />
      <main style={{ marginTop: '0', ...mainStyle }}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default PrivateLayout;
