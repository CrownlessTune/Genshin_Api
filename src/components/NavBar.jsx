import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State for login status

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
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
        <div onClick={toggleMenu} style={{ cursor: 'pointer', fontSize: '20px', fontWeight: 'bold' }}>
          Menu
        </div>
        {isMenuOpen && (
          <div style={{
            position: 'absolute',
            top: '100%',
            left: '0',
            backgroundColor: '#fff',
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
            border: '1px solid #ccc',
            borderRadius: '5px',
            padding: '10px',
            minWidth: '150px',
            zIndex: '1000',
          }}>
            <ul style={{ listStyle: 'none', margin: '0', padding: '0' }}>
              <li style={{ padding: '5px 0' }}><Link to="/regions" style={{ textDecoration: 'none', color: '#000' }}>Regions</Link></li>
              <li style={{ padding: '5px 0' }}><Link to="/characters" style={{ textDecoration: 'none', color: '#000' }}>Characters</Link></li>
              <li style={{ padding: '5px 0' }}><Link to="/enemies" style={{ textDecoration: 'none', color: '#000' }}>Enemies</Link></li>
              <li style={{ padding: '5px 0' }}><Link to="/community" style={{ textDecoration: 'none', color: '#000' }}>Community</Link></li>
            </ul>
          </div>
        )}
      </div>

      {/* Barra de búsqueda */}
      <div style={{ flex: 1, marginRight: '20px' }}>
        <input
          type="text"
          placeholder="Search..."
          style={{
            padding: '10px',
            width: '100%',
            fontSize: '16px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            textAlign: 'center',
          }}
        />
      </div>

      {/* Condicional de Navbar según estado de login */}
      {isLoggedIn ? (
        // Navbar cuando el usuario está logueado
        <div>
          <Link to="/profile" style={{ fontSize: '20px', marginLeft: '20px' }}>Profile</Link>
          <button style={{ marginLeft: '20px' }} onClick={() => setIsLoggedIn(false)}>Log Out</button>
        </div>
      ) : (
        // Navbar cuando el usuario no está logueado
        <div>
          <Link to="/login" style={{ fontSize: '24px', fontWeight: 'bold', textDecoration: 'none', color: '#000' }}>
            <button style={{ marginLeft: '20px' }}>Login</button>
          </Link>
        </div>
      )}

      {/* Selector de tema */}
      <div style={{ marginLeft: '20px' }}>
        <Link to="/themes" style={{ fontSize: '24px', fontWeight: 'bold', textDecoration: 'none', color: '#000' }}>
          <span role="img" aria-label="theme" style={{ fontSize: '24px', cursor: 'pointer' }}>🌙</span>
        </Link>
      </div>
    </header>
  );
};

export default NavBar;
