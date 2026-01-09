import React, { createContext, useContext, useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import './Layout.css';

const SearchContext = createContext();

export const useSearch = () => useContext(SearchContext);

const Layout = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
      <div className="layout">
        <Sidebar />
        <div className="main-container">
          <Header />
          <main className="main-content">
            {children}
          </main>
        </div>
      </div>
    </SearchContext.Provider>
  );
};

export default Layout;
