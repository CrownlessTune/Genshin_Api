import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../sass/components/_NavBar.scss';
import '../sass/themes/theme.scss';
import Icon from '../assets/img/Paimon_Icon.png'; 
import ThemeIcon from '../assets/img/Theme_Icon.png';
import { auth, db } from '../config/firebase'; // Asegúrate de importar auth y db
import { doc, getDoc } from 'firebase/firestore';

const PrivateNavBar = ({ onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); 
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false); 
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false); 
  const [currentTheme, setCurrentTheme] = useState('Celestia');
  const [username, setUsername] = useState('');
  const themes = ['Celestia', 'Hydro', 'Dendro', 'Pyro', 'Cryo', 'Anemo', 'Geo', 'Abyss'];

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const fetchUserData = async () => {
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUsername(userData.username); // Establecer el nombre de usuario desde Firestore
        }
      };

      fetchUserData();
    }
  }, []);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const toggleUserMenu = () => setIsUserMenuOpen((prev) => !prev);
  const toggleThemeMenu = () => setIsThemeMenuOpen((prev) => !prev);

  const handleThemeChange = (themeName) => {
    setCurrentTheme(themeName);
    document.body.classList.remove(...themes);
    document.body.classList.add(themeName);
    localStorage.setItem('theme', themeName);
  };

  return (
    <header className="navbar">
      {/* Icono de Inicio */}
      <div className="navbar-home">
        <Link to="/">
          <img src={Icon} alt="Home" />
        </Link>
      </div>

      {/* Menú de Navegación */}
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

      {/* Barra de Búsqueda */}
      <div className="navbar-search">
        <input type="text" placeholder="Search..." />
      </div>

      {/* Menú de Usuario */}
      <div className="navbar-user">
        <button onClick={toggleUserMenu} className="user-button">
          {username || 'Loading...'}
        </button>
        {isUserMenuOpen && (
          <div className="user-dropdown">
            <ul>
              <li><Link to="/user">Profile</Link></li> {/* Modificado a /user */}
              <li><button onClick={onLogout}>Logout</button></li>
            </ul>
          </div>
        )}
      </div>

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

export default PrivateNavBar;
