import React from 'react';
import { useSearch } from './Layout';
import './Header.css';

const Header = () => {
  const { searchQuery, setSearchQuery } = useSearch();

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
      <div className="header-user">
        <span className="user-name">Sayef mahmud</span>
        <span className="user-icon">👤</span>
        <span className="menu-icon">☰</span>
      </div>
    </header>
  );
};

export default Header;
