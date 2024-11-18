// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={{
      marginTop: 'auto',
      padding: '20px',
      backgroundColor: '#h1h1h1',
      fontSize: '18px',
      fontWeight: 'bold',
      position: 'fixed',
      bottom: 0,
      left: 0,
      width: '100%',
      borderTop: '2px solid #ccc',
      textAlign: 'center',
    }}>
      <Link to="/contact" style={{ fontSize: '20px' }}>Contact</Link>
    </footer>
  );
};

export default Footer;
