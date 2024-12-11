import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../sass/components/_NavBar.scss';
import '../sass/themes/theme.scss';
import Icon from '../assets/img/Paimon_Icon.png';
import ThemeIcon from '../assets/img/Theme_Icon.png';

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('Celestia');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const themeRef = useRef(null);

  const themes = ['Celestia', 'Hydro', 'Dendro', 'Pyro', 'Cryo', 'Anemo', 'Geo', 'Abyss'];

  const handleThemeChange = (themeName) => {
    setCurrentTheme(themeName);
    document.body.classList.remove(...themes); // Elimina todas las clases anteriores
    document.body.classList.add(themeName); // Añade la nueva clase del tema
    localStorage.setItem('theme', themeName); // Guarda el tema en el localStorage
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    const initialTheme = storedTheme || 'Celestia'; // Si no hay tema guardado, se usa 'Celestia'
    setCurrentTheme(initialTheme);
    document.body.classList.add(initialTheme); // Aplica el tema al cargar
  }, []);

  // Cierra los menús al hacer clic fuera de ellos
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
      if (themeRef.current && !themeRef.current.contains(event.target)) {
        setIsThemeMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="navbar" role="banner">
      <h1 className="navbar-logo">
        <Link to="/" aria-label="Go to homepage">
          <img src={Icon} alt="Paimon icon" />
        </Link>
      </h1>

      <nav className="navbar-menu" ref={menuRef} aria-label="Main menu">
        <button
          className="navbar-menu-trigger"
          aria-expanded={isMenuOpen ? 'true' : 'false'}
          aria-controls="menu-list"
          onClick={() => setIsMenuOpen((prev) => !prev)} // Abre o cierra el menú al hacer clic
        >
          Menu
        </button>
        {isMenuOpen && (
          <ul id="menu-list" className="navbar-menu-dropdown" role="menu">
            <li><Link to="/regions" role="menuitem">Regions</Link></li>
            <li><Link to="/characters" role="menuitem">Characters</Link></li>
            <li><Link to="/enemies" role="menuitem">Enemies</Link></li>
            <li><Link to="/community" role="menuitem">Community</Link></li>
          </ul>
        )}
      </nav>

      <section className="navbar-search" aria-labelledby="search-label">
        <label id="search-label" htmlFor="search-input"></label>
        <input
          id="search-input"
          type="text"
          placeholder="Search..."
          aria-label="Search for content"
        />
      </section>

      <section className="navbar-auth">
        {isLoggedIn ? (
          <>
            <Link to="/profile" aria-label="Go to profile">Profile</Link>
            <button onClick={() => setIsLoggedIn(false)}>Log Out</button>
          </>
        ) : (
          <Link to="/login" aria-label="Go to login page">
            <button>Login</button>
          </Link>
        )}
      </section>

      <section className="navbar-theme" ref={themeRef}>
        <button
          className="theme-button"
          aria-label="Change theme"
          onClick={() => setIsThemeMenuOpen((prev) => !prev)} // Abre o cierra el menú de temas
        >
          <img src={ThemeIcon} alt="Change theme" />
        </button>
        {isThemeMenuOpen && (
          <ul className="theme-dropdown" role="menu">
            {themes.map((themeName) => (
              <li key={themeName}>
                <button
                  className={`theme-option ${currentTheme === themeName ? 'active' : ''}`}
                  onClick={() => handleThemeChange(themeName)}
                  role="menuitem"
                >
                  {themeName}
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </header>
  );
};

export default NavBar;
