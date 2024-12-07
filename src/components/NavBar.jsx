import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../sass/components/_NavBar.scss';
import '../sass/themes/theme.scss';
import Icon from '../assets/img/Paimon_Icon.png'; 
import ThemeIcon from '../assets/img/Theme_Icon.png';
const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false); // Estado para controlar el desplegable del tema
  const [currentTheme, setCurrentTheme] = useState('Celestia');
  const themes = [
    'Celestia', 'Hydro', 'Dendro', 'Pyro', 'Cryo', 'Anemo', 'Geo', 'Abyss'
  ];

  // Función para cambiar el tema aplicando la clase correspondiente al body
  const handleThemeChange = (themeName) => {
    setCurrentTheme(themeName);
    document.body.classList.remove(...themes); // Remueve todas las clases de tema
    document.body.classList.add(themeName); // Añade la clase del tema seleccionado
    localStorage.setItem('theme', themeName); // Guarda el tema seleccionado en el localStorage
  };

  // Comprobar si hay un tema guardado en el localStorage al cargar el componente
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    const initialTheme = storedTheme || 'Celestia'; // Si no hay tema guardado, usa Celestia por defecto
    setCurrentTheme(initialTheme);
    document.body.classList.add(initialTheme); // Aplica la clase del tema guardado o Celestia
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const toggleThemeMenu = () => {
    setIsThemeMenuOpen((prev) => !prev); // Abre/cierra el menú del tema
  };

  return (
    <header className="navbar">
      <div className="navbar-home">
        <Link to="/">
          <img src={Icon} alt="Home" />
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

      {/* Botón de cambio de tema */}
      <div className="navbar-theme">
        <button onClick={toggleThemeMenu} className="theme-button">
          <img src={ThemeIcon} alt="Theme" />
        </button>
        {isThemeMenuOpen && (
          <div className="theme-dropdown">
            {themes.map((themeName) => (
              <button
                key={themeName}
                className={`theme-option ${currentTheme === themeName ? 'active' : ''}`}
                onClick={() => handleThemeChange(themeName)}
              >
                {themeName}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};

export default NavBar;
