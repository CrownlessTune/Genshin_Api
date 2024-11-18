import React from 'react';
import { Link } from 'react-router-dom';
import LayoutPublic from '../layout/PublicLayout';

const Error404 = () => {
  return (
    <LayoutPublic>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
        color: '#333',
      }}>
        <h1 style={{ fontSize: '80px', margin: '0' }}>404</h1>
        <h2 style={{ fontSize: '24px', margin: '10px 0' }}>Paimon says that this page is not found</h2>
        <p style={{ fontSize: '16px', marginBottom: '20px' }}>
          Traveler! Did we get lost again?
        </p>
        <Link to="/" style={{
          textDecoration: 'none',
          padding: '10px 20px',
          backgroundColor: '#007BFF',
          color: '#fff',
          borderRadius: '5px',
          fontSize: '16px',
        }}>
          Go Back Home
        </Link>
      </div>
    </LayoutPublic>
  );
};

export default Error404;
