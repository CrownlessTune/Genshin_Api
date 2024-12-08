import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../sass/components/_PrivateNavBar.scss';
import '../sass/themes/theme.scss';
import Icon from '../assets/img/Paimon_Icon.png'; 
import ThemeIcon from '../assets/img/Theme_Icon.png';
import { auth, db } from '../config/firebase';
import { signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

const PrivateNavBar = ({ onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('Celestia');
  const [username, setUsername] = useState('');
  const themes = ['Celestia', 'Hydro', 'Dendro', 'Pyro', 'Cryo', 'Anemo', 'Geo', 'Abyss'];

  const navigate = useNavigate();

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const fetchUserData = async () => {
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUsername(userData.username);
        } else {
          console.error('No such user!');
        }
      };

      fetchUserData();
    } else {
      console.log('No user is currently logged in.');
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

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error during sign out: ', error);
    }
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

      <div className="navbar-user">
        <div onClick={toggleUserMenu} className="navbar-user-trigger">
          {username || 'Loading...'}
        </div>
        {isUserMenuOpen && (
          <div className="navbar-user-dropdown">
            <ul>
              <li><Link to="/user">Profile</Link></li>
              <li><div onClick={handleLogout}>Logout</div></li>
            </ul>
          </div>
        )}
      </div>

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
