// src/layout/LayoutPublic.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const LayoutPublic = ({ children, mainStyle }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '10px',
        borderBottom: '1px solid #ccc',
        alignItems: 'center',
      }}>
        <div style={{ marginRight: '20px' }}>
          <Link to="/" style={{ fontSize: '24px', fontWeight: 'bold', textDecoration: 'none', color: '#000' }}>
            <span role="img" aria-label="home">🏠</span>
          </Link>
        </div>

        {/* Menú desplegable */}
        <div style={{ position: 'relative', marginRight: '20px' }}>
          <div
            style={{
              cursor: 'pointer', fontSize: '20px', fontWeight: 'bold', display: 'inline-block'
            }}
          >
            Menu
          </div>
        </div>

        {/* Search Bar */}
        <div style={{ flex: 1, marginRight: '20px' }}>
          <input
            type="text"
            placeholder="Search..."
            style={{
              padding: '10px', width: '100%', fontSize: '16px', fontFamily: 'Archive Black, sans-serif',
              borderRadius: '5px', border: '1px solid #ccc', textAlign: 'center'
            }}
          />
        </div>

        <button style={{ marginLeft: '20px' }}>Login</button>

        <div style={{ marginLeft: '20px' }}>
          <span role="img" aria-label="theme" style={{ fontSize: '24px', cursor: 'pointer' }}>🌙</span>
        </div>
      </header>

      {/* Main Section with dynamic styles */}
      <main style={{ marginTop: '0', ...mainStyle }}>
        {children}
      </main>

      <footer  style={{
    marginTop: 'auto', 
    padding: '20px', 
    backgroundColor: '#f1f1f1', 
    fontSize: '18px', 
    fontWeight: 'bold', 
    position: 'fixed', 
    bottom: 0, 
    left: 0, 
    width: '100%', 
    borderTop: '1px solid #ccc', 
    textAlign: 'center'  // Asegura que el texto esté centrado
  }}>
        <Link to="/contact" style={{ paddingLeft: '100px', fontSize: '20px' }}>Contact</Link>
      </footer>
    </div>
  );
};

export default LayoutPublic;
