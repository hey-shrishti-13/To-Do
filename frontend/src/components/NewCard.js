import React from 'react';
import './NewCard.css';

const NewCard = ({ type, onClick }) => {
  return (
    <div className="new-card" onClick={onClick}>
      <div className="new-card-icon">
        {type === 'folder' ? '📁' : '📄'}
        <span className="plus-icon">+</span>
      </div>
      <div className="new-card-label">
        New {type === 'folder' ? 'folder' : 'note'}
      </div>
    </div>
  );
};

export default NewCard;
