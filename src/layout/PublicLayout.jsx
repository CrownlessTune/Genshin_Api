import React from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const PublicLayout = ({ children, mainStyle }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <NavBar />
      <main style={{ marginTop: '0', ...mainStyle }}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
