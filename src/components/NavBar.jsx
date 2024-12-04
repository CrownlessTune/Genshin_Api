import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../sass/components/_NavBar.scss';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header className="navbar">
      <div className="navbar-home">
        <Link to="/">
          <span role="img" aria-label="home">🏠</span>
        </Link>
      </div>

      <div className="navbar-menu">
        <div onClick={toggleMenu} className="navbar-menu-trigger">
          Menu
        </div>
        {isMenuOpen && (
          <div className="navbar-menu-dropdown">
            <ul>
              <li><Link to="/regions">Regions</Link></li>
              <li><Link to="/characters">Characters</Link></li>
              <li><Link to="/enemies">Enemies</Link></li>
              <li><Link to="/community">Community</Link></li>
            </ul>
          </div>
        )}
      </div>

      <div className="navbar-search">
        <input type="text" placeholder="Search..." />
      </div>

      {isLoggedIn ? (
        <div className="navbar-auth">
          <Link to="/profile">Profile</Link>
          <button onClick={() => setIsLoggedIn(false)}>Log Out</button>
        </div>
      ) : (
        <div className="navbar-auth">
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
      )}

      <div className="navbar-theme">
        <Link to="/themes">
          <span role="img" aria-label="theme">🌙</span>
        </Link>
      </div>
    </header>
  );
};

export default NavBar;
