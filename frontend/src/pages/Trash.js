import React, { useState, useEffect, useCallback } from 'react';
import { trashAPI } from '../services/api';
import { format } from 'date-fns';
import './Trash.css';

const Trash = () => {
  const [trashItems, setTrashItems] = useState([]);
  const [filter, setFilter] = useState('all'); // all, task, folder

  const loadTrash = useCallback(async () => {
    try {
      const params = filter !== 'all' ? { type: filter } : {};
      const response = await trashAPI.getAll(params);
      setTrashItems(response.data);
    } catch (error) {
      console.error('Error loading trash:', error);
    }
  }, [filter]);

  useEffect(() => {
    loadTrash();
  }, [loadTrash]);

  const handleRestore = async (id) => {
    try {
      await trashAPI.restore(id);
      loadTrash();
      alert('Item restored successfully');
    } catch (error) {
      console.error('Error restoring item:', error);
      alert('Error restoring item');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to permanently delete this item?')) {
      try {
        await trashAPI.delete(id);
        loadTrash();
      } catch (error) {
        console.error('Error deleting item:', error);
        alert('Error deleting item');
      }
    }
  };

  const handleEmptyTrash = async () => {
    if (window.confirm('Are you sure you want to empty the trash? This cannot be undone.')) {
      try {
        await trashAPI.empty();
        loadTrash();
        alert('Trash emptied');
      } catch (error) {
        console.error('Error emptying trash:', error);
        alert('Error emptying trash');
      }
    }
  };

  return (
    <div className="trash-page">
      <div className="trash-header">
        <h1>Trash</h1>
        {trashItems.length > 0 && (
          <button className="empty-trash-btn" onClick={handleEmptyTrash}>
            Empty Trash
          </button>
        )}
      </div>

      <div className="trash-filters">
        <button
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button
          className={`filter-btn ${filter === 'task' ? 'active' : ''}`}
          onClick={() => setFilter('task')}
        >
          Tasks
        </button>
        <button
          className={`filter-btn ${filter === 'folder' ? 'active' : ''}`}
          onClick={() => setFilter('folder')}
        >
          Folders
        </button>
      </div>

      {trashItems.length === 0 ? (
        <div className="empty-trash">
          <p>Trash is empty</p>
        </div>
      ) : (
        <div className="trash-items">
          {trashItems.map(item => (
            <div key={item._id} className="trash-item">
              <div className="trash-item-info">
                <div className="trash-item-type">{item.type}</div>
                <div className="trash-item-name">
                  {item.type === 'task' ? item.data.title : item.data.name}
                </div>
                <div className="trash-item-date">
                  Deleted: {format(new Date(item.deletedAt), 'dd/MM/yyyy HH:mm')}
                </div>
              </div>
              <div className="trash-item-actions">
                <button
                  className="restore-btn"
                  onClick={() => handleRestore(item._id)}
                >
                  Restore
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(item._id)}
                >
                  Delete Permanently
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Trash;
