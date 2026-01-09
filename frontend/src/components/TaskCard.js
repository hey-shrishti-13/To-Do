import React from 'react';
import { format } from 'date-fns';
import './TaskCard.css';

const TaskCard = ({ task, onClick, onComplete, onDelete }) => {
  const handleComplete = (e) => {
    e.stopPropagation();
    onComplete(task._id, !task.completed);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this task?')) {
      onDelete(task._id);
    }
  };

  return (
    <div 
      className={`task-card ${task.completed ? 'completed' : ''}`}
      onClick={() => onClick && onClick(task)}
    >
      <div className="task-header">
        <div className="task-date">
          {format(new Date(task.createdAt), 'dd/MM/yyyy')}
        </div>
        <div className="task-actions">
          <button 
            className={`complete-btn ${task.completed ? 'checked' : ''}`}
            onClick={handleComplete}
          >
            {task.completed ? '✓' : ''}
          </button>
          <button className="delete-btn" onClick={handleDelete}>
            🗑️
          </button>
        </div>
      </div>
      <h3 className="task-title">{task.title}</h3>
      {task.description && (
        <p className="task-description">{task.description}</p>
      )}
      {task.media && task.media.length > 0 && (
        <div className="task-media">
          {task.media.map((media, index) => {
            const mediaUrl = media.startsWith('http') 
              ? media 
              : `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}${media}`;
            return (
              <img 
                key={index} 
                src={mediaUrl} 
                alt={`Media ${index + 1}`}
                className="media-preview"
              />
            );
          })}
        </div>
      )}
      <div className="task-footer">
        <span className="task-time">
          🕐 {format(new Date(task.createdAt), 'hh:mm a, EEEE')}
        </span>
      </div>
    </div>
  );
};

export default TaskCard;
