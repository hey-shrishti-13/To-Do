import React, { useState, useEffect } from 'react';
import './TaskForm.css';

const TaskForm = ({ task, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [folderId, setFolderId] = useState('');
  const [label, setLabel] = useState('');
  const [mediaFiles, setMediaFiles] = useState([]);
  const [folders, setFolders] = useState([]);

  useEffect(() => {
    if (task) {
      setTitle(task.title || '');
      setDescription(task.description || '');
      setFolderId(task.folderId?._id || '');
      setLabel(task.label || '');
    }
    loadFolders();
  }, [task]);

  const loadFolders = async () => {
    try {
      const { foldersAPI } = require('../services/api');
      const response = await foldersAPI.getAll();
      setFolders(response.data);
    } catch (error) {
      console.error('Error loading folders:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      title,
      description,
      folderId: folderId || 'null',
      label,
    };
    onSubmit(formData, mediaFiles);
  };

  const handleFileChange = (e) => {
    setMediaFiles(Array.from(e.target.files));
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="form-input"
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="5"
          className="form-textarea"
        />
      </div>

      <div className="form-group">
        <label htmlFor="folder">Folder</label>
        <select
          id="folder"
          value={folderId}
          onChange={(e) => setFolderId(e.target.value)}
          className="form-select"
        >
          <option value="">None</option>
          {folders.map(folder => (
            <option key={folder._id} value={folder._id}>
              {folder.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="label">Label</label>
        <input
          type="text"
          id="label"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          className="form-input"
          placeholder="e.g., Work, Personal"
        />
      </div>

      <div className="form-group">
        <label htmlFor="media">Add Media</label>
        <input
          type="file"
          id="media"
          multiple
          accept="image/*,video/*,audio/*,.pdf"
          onChange={handleFileChange}
          className="form-file"
        />
        {mediaFiles.length > 0 && (
          <div className="file-list">
            {mediaFiles.map((file, index) => (
              <span key={index} className="file-name">{file.name}</span>
            ))}
          </div>
        )}
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {task ? 'Update' : 'Create'} Task
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
