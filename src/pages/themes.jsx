import React from 'react';
import LayoutPublic from '../layout/PublicLayout';
import { useTheme } from '../context/themeContext'; // Usamos el hook del contexto
import { themes } from './themes'; // Importamos los estilos de los temas

function Themes() {
  const { theme, changeTheme } = useTheme(); // Obtenemos el tema y la función para cambiarlo

  const mainStyle = {
    padding: '40px',
    minHeight: '600px',
    textAlign: 'center',
    backgroundColor: themes[theme].backgroundColor, // Establecemos el fondo según el tema
    color: themes[theme].color, // Establecemos el color del texto según el tema
    transition: 'all 0.3s ease', // Transición suave entre los cambios de tema
  };

  return (
    <LayoutPublic mainStyle={mainStyle}>
      <h2>Select a Theme</h2>
      <div style={{ marginBottom: '20px' }}>
        {Object.keys(themes).map((themeKey) => (
          <button
            key={themeKey}
            onClick={() => changeTheme(themeKey)} // Cambiamos el tema cuando se hace clic
            style={{
              backgroundColor: themes[themeKey].backgroundColor,
              color: themes[themeKey].color,
              padding: '10px 20px',
              margin: '5px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '16px',
            }}
          >
            {themeKey} Theme
          </button>
        ))}
      </div>
    </LayoutPublic>
  );
}

export default Themes;
