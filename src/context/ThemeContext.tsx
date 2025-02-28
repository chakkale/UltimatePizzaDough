import React, { createContext, useState, useContext, useEffect } from 'react';
import { trackThemeChange } from '../utils/analytics';

// Named export to fix fast refresh warning
export const ThemeContextExport = 'ThemeContext';

type ThemeType = 'light' | 'dark';

interface ThemeContextType {
  theme: ThemeType;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Check if user has a saved preference or use system preference
  const getInitialTheme = (): ThemeType => {
    const savedTheme = localStorage.getItem('theme') as ThemeType;
    if (savedTheme) return savedTheme;
    
    // Check system preference
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches 
      ? 'dark' 
      : 'light';
  };

  const [theme, setTheme] = useState<ThemeType>(getInitialTheme);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    // Track theme change, but only after initial render
    const isInitialRender = document.documentElement.getAttribute('data-analytics-tracked') !== 'true';
    if (!isInitialRender) {
      trackThemeChange(theme);
    } else {
      document.documentElement.setAttribute('data-analytics-tracked', 'true');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}; 