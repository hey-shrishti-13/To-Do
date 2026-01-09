import React from 'react';
import { format } from 'date-fns';
import './FolderCard.css';

const FolderCard = ({ folder, onClick, onDelete, isSelected }) => {
  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this folder?')) {
      onDelete(folder._id);
    }
  };

  return (
    <div className={`folder-card ${isSelected ? 'selected' : ''}`} onClick={() => onClick && onClick(folder)}>
      <div className="folder-header">
        <div className="folder-icon" style={{ backgroundColor: folder.color || '#3498db' }}>
          📁
        </div>
        <button className="folder-menu" onClick={handleDelete}>
          ⋯
        </button>
      </div>
      <div className="folder-title">{folder.name}</div>
      <div className="folder-date">
        {format(new Date(folder.createdAt), 'dd/MM/yyyy')}
      </div>
    </div>
  );
};

export default FolderCard;
