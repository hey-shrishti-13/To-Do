import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const location = useLocation();
  const [showAddMenu, setShowAddMenu] = useState(false);

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <span className="logo-text">MEOWDO</span>
        </div>
      </div>

      <div className="add-new-section">
        <button 
          className="add-new-btn"
          onClick={() => setShowAddMenu(!showAddMenu)}
        >
          <span className="plus-icon">+</span>
          <span>Add new</span>
        </button>
        {showAddMenu && (
          <div className="add-menu">
            <div className="color-dots">
              <span className="dot red"></span>
              <span className="dot orange"></span>
              <span className="dot blue"></span>
            </div>
          </div>
        )}
      </div>

      <nav className="sidebar-nav">
        <Link 
          to="/archive" 
          className={`nav-item ${location.pathname === '/archive' ? 'active' : ''}`}
        >
          <span className="nav-icon">📅</span>
          <span>Calendar</span>
        </Link>
        <Link 
          to="/archive" 
          className={`nav-item ${location.pathname === '/archive' ? 'active' : ''}`}
        >
          <span className="nav-icon">📦</span>
          <span>Archive</span>
        </Link>
        <Link 
          to="/trash" 
          className={`nav-item ${location.pathname === '/trash' ? 'active' : ''}`}
        >
          <span className="nav-icon">🗑️</span>
          <span>Trash</span>
        </Link>
      </nav>

      <div className="sidebar-footer">
        <div className="upgrade-box">
          <div className="upgrade-illustration">👤</div>
          <p className="upgrade-text">
            Want to access unlimited notes taking experience & lots of feature?
          </p>
          <button className="upgrade-btn">Upgrade pro</button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
