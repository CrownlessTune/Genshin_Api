import React from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const PublicLayout = ({ children, mainStyle }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <NavBar />
      <main style={{ flex: 1, padding: '20px', textAlign: 'center', ...mainStyle }}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
