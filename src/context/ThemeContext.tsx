import React, { createContext, useContext, useState, useEffect } from 'react';

export type Theme = 'deep-space' | 'parchment';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    try {
      const saved = localStorage.getItem('paramecia_theme');
      return saved === 'parchment' || saved === 'deep-space' ? saved : 'deep-space';
    } catch {
      return 'deep-space';
    }
  });

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem('paramecia_theme', newTheme);
    } catch (e) {
      console.warn('Unable to persist theme to localStorage', e);
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'deep-space' ? 'parchment' : 'deep-space');
  };

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    if (theme === 'parchment') {
      root.classList.add('theme-parchment');
      document.body.style.backgroundColor = '#f6f1e5';
      document.body.style.color = '#1c1917';
    } else {
      root.classList.remove('theme-parchment');
      document.body.style.backgroundColor = '#0c0a09';
      document.body.style.color = '#f5f5f4';
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
