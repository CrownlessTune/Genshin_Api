import React, { useState, useEffect } from 'react';
import '../sass/themes/theme.scss'; // Asegúrate de importar el archivo SCSS

const ThemeSwitcher = () => {
  const themes = [
    'Celestia', 'Hydro', 'Dendro', 'Pyro', 'Cryo', 'Anemo', 'Geo', 'Abyss'
  ];

  const [currentTheme, setCurrentTheme] = useState('Celestia');

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

  // Guardar el tema en el localStorage cuando se cambie sin que se necesite ir al componente ThemeSwitcher
  useEffect(() => {
    // Si el tema actual cambia, actualiza el localStorage
    localStorage.setItem('theme', currentTheme);
  }, [currentTheme]);

  return (
    <div className="theme-switcher">
      <h2>Choose a Theme</h2>
      <div className="theme-buttons">
        {themes.map((themeName) => (
          <button
            key={themeName}
            className={`theme-button ${currentTheme === themeName ? 'active' : ''}`}
            onClick={() => handleThemeChange(themeName)}
          >
            {themeName}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThemeSwitcher;
