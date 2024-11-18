import React, { createContext, useState, useContext } from 'react';

// Crear el contexto del tema
const ThemeContext = createContext();

// Proveedor de contexto de tema
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('Celestia');

  const toggleTheme = (newTheme) => {
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook para acceder al contexto de tema
export const useTheme = () => useContext(ThemeContext);
