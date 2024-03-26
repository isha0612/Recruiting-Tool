import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';

interface ThemeContextType {
  isDarkMode: boolean;
  toggleDarkMode: (value: boolean) => void;
}

interface ThemeProviderProps {
  children: ReactNode;
}

const DarkModeContext = createContext<ThemeContextType>({
  isDarkMode: false,
  toggleDarkMode: () => {}
});

export const useDarkMode = () => useContext(DarkModeContext);

export const DarkModeProvider = ({ children }: ThemeProviderProps) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;

    if(localStorage.getItem('darkMode') === 'true') {
        setIsDarkMode(true);
        root.classList.add('dark');
        root.style.backgroundColor = "#1f2937";
        localStorage.setItem('darkMode', 'true');
        return;
    }

    setIsDarkMode(false);
    root.classList.remove('dark');
    root.style.backgroundColor = "white";
    localStorage.setItem('darkMode', 'false');
  }, [isDarkMode, setIsDarkMode]);

  const toggleDarkMode = () => {
    const theme = isDarkMode === false ? true : false;
    setIsDarkMode(theme);
    localStorage.setItem('darkMode', theme.toString());
};

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};