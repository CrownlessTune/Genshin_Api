import React from 'react';
import PrivateNavBar from '../components/PrivateNavBar';
import Footer from '../components/Footer';

const PrivateLayout = ({ children, mainStyle, username, onLogout }) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      boxSizing: 'border-box',
      width: '100%',
      overflowX: 'hidden',
    }}>
      <PrivateNavBar username={username} onLogout={onLogout} />
      <main
        style={{
          flex: 1,
          padding: '20px',
          textAlign: 'center',
          overflowY: 'auto',
          maxWidth: '100%',
          width: '100%',
          ...mainStyle,
        }}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default PrivateLayout;
