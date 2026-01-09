import React from 'react';
import { useSearch, useTheme } from './Layout';
import './Header.css';

const Header = () => {
  const { searchQuery, setSearchQuery } = useSearch();
  const { darkMode, toggleDarkMode } = useTheme();

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <header className="header">
      <h1 className="header-title">MY NOTES</h1>
      <div className="header-search">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>
      <button className="dark-mode-toggle" onClick={toggleDarkMode} title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}>
        {darkMode ? '☀️' : '🌙'}
      </button>
    </header>
  );
};

export default Header;
