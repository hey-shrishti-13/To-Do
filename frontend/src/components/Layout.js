import React, { createContext, useContext, useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import './Layout.css';

const SearchContext = createContext();
const ThemeContext = createContext();

export const useSearch = () => useContext(SearchContext);
export const useTheme = () => useContext(ThemeContext);

const Layout = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
      <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
        <div className={`layout ${darkMode ? 'dark-mode' : ''}`}>
          <Sidebar />
          <div className="main-container">
            <Header />
            <main className="main-content">
              {children}
            </main>
          </div>
        </div>
      </ThemeContext.Provider>
    </SearchContext.Provider>
  );
};

export default Layout;
