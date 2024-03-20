import React, { createContext, useState, useEffect, useContext } from 'react';

const DarkModeContext = createContext();

export const useDarkMode = () => useContext(DarkModeContext);

export const DarkModeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;

    if(localStorage.getItem('darkMode') === 'true') {
        setIsDarkMode(localStorage.darkMode);
        root.classList.add('dark');
        root.style.backgroundColor = "#1f2937";
        localStorage.setItem('darkMode', 'true');
        return;
    }

    setIsDarkMode('false');
    root.classList.remove('dark');
    root.style.backgroundColor = "white";
    localStorage.setItem('darkMode', 'false');
  }, [isDarkMode, setIsDarkMode]);

  const toggleDarkMode = () => {
    const theme = isDarkMode === 'false' ? 'true' : 'false';
    setIsDarkMode(theme);
    localStorage.setItem('darkMode', theme);
};

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};