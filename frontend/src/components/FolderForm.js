import React, { useState } from 'react';
import './FolderForm.css';

const FolderForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [label, setLabel] = useState('');
  const [color, setColor] = useState('#3498db');

  const colors = [
    '#3498db', '#e74c3c', '#f39c12', '#2ecc71',
    '#9b59b6', '#1abc9c', '#e67e22', '#34495e'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, label, color });
    setName('');
    setLabel('');
    setColor('#3498db');
  };

  return (
    <form onSubmit={handleSubmit} className="folder-form">
      <div className="form-group">
        <label htmlFor="name">Folder Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="form-input"
          placeholder="e.g., Work, Personal"
        />
      </div>

      <div className="form-group">
        <label htmlFor="label">Label</label>
        <input
          type="text"
          id="label"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          className="form-input"
          placeholder="Optional label"
        />
      </div>

      <div className="form-group">
        <label>Color</label>
        <div className="color-picker">
          {colors.map((c) => (
            <button
              key={c}
              type="button"
              className={`color-option ${color === c ? 'selected' : ''}`}
              style={{ backgroundColor: c }}
              onClick={() => setColor(c)}
            />
          ))}
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          Create Folder
        </button>
      </div>
    </form>
  );
};

export default FolderForm;
