import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const PrivateNavBar = ({ username, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Para manejar el menú desplegable de navegación
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false); // Para manejar el menú desplegable del usuario
  const [isSearchFocused, setIsSearchFocused] = useState(false); // Para manejar el enfoque de la búsqueda

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen((prev) => !prev);
    console.log(isUserMenuOpen); // Para depuración
  };

  return (
    <header style={{
      display: 'flex',
      justifyContent: 'space-between',
      padding: '10px',
      borderBottom: '1px solid #ccc',
      alignItems: 'center',
      backgroundColor: '#f8f8f8',
    }}>
      {/* Icono Home */}
      <div style={{ marginRight: '20px' }}>
        <Link to="/" style={{ fontSize: '24px', fontWeight: 'bold', textDecoration: 'none', color: '#000' }}>
          <span role="img" aria-label="home">🏠</span>
        </Link>
      </div>

      {/* Menú Desplegable de Navegación */}
      <div style={{ position: 'relative', marginRight: '20px' }}>
        <button onClick={toggleMenu} style={{
          cursor: 'pointer', 
          fontSize: '18px', 
          fontWeight: 'bold', 
          background: 'none', 
          border: 'none', 
          color: '#000'
        }}>
          Menu
        </button>
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
              <li style={{ padding: '5px 0' }}>
                <Link to="/character">Character</Link>
              </li>
              <li style={{ padding: '5px 0' }}>
                <Link to="/enemies">Enemies</Link>
              </li>
              <li style={{ padding: '5px 0' }}>
                <Link to="/regions">Regions</Link>
              </li>
              <li style={{ padding: '5px 0' }}>
                <Link to="/community">Community</Link>
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Área de búsqueda */}
      <div style={{ flex: 1, marginRight: '20px' }}>
        <textarea
          placeholder="Search..."
          rows={1}
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => setIsSearchFocused(false)}
          style={{
            padding: '10px',
            width: '100%',
            fontSize: '16px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            textAlign: 'center',
            backgroundColor: isSearchFocused ? '#fff' : '#f1f1f1',
          }}
        />
      </div>

      {/* Menú desplegable de Usuario */}
      <div style={{ position: 'relative' }}>
        <button onClick={toggleUserMenu} style={{
          cursor: 'pointer', 
          fontSize: '18px', 
          fontWeight: 'bold', 
          background: 'none', 
          border: 'none', 
          color: '#000'
        }}>
          {username}
        </button>
        {isUserMenuOpen && (
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
              <li style={{ padding: '5px 0' }}>
                <button disabled style={{ cursor: 'not-allowed' }}>Change Account</button>
              </li>
              <li style={{ padding: '5px 0' }}>
                <button onClick={onLogout}>Logout</button>
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Icono para cambiar tema */}
      <div style={{ marginLeft: '20px' }}>
        <Link to="/theme" style={{ fontSize: '24px', fontWeight: 'bold', textDecoration: 'none', color: '#000' }}>
          <span role="img" aria-label="theme">🌙</span>
        </Link>
      </div>
    </header>
  );
};

export default PrivateNavBar;
