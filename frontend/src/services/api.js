import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Folders API
export const foldersAPI = {
  getAll: (params) => api.get('/folders', { params }),
  getById: (id) => api.get(`/folders/${id}`),
  create: (data) => api.post('/folders', data),
  update: (id, data) => api.put(`/folders/${id}`, data),
  delete: (id) => api.delete(`/folders/${id}`),
};

// Tasks API
export const tasksAPI = {
  getAll: (params) => {
    const formData = new FormData();
    Object.keys(params || {}).forEach(key => {
      if (params[key] !== undefined && params[key] !== null) {
        formData.append(key, params[key]);
      }
    });
    return api.get('/tasks', { params });
  },
  getById: (id) => api.get(`/tasks/${id}`),
  create: (data, files) => {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      formData.append(key, data[key]);
    });
    if (files && files.length > 0) {
      files.forEach(file => formData.append('media', file));
    }
    return api.post('/tasks', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  update: (id, data, files) => {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      formData.append(key, data[key]);
    });
    if (files && files.length > 0) {
      files.forEach(file => formData.append('media', file));
    }
    return api.put(`/tasks/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  delete: (id) => api.delete(`/tasks/${id}`),
};

// Trash API
export const trashAPI = {
  getAll: (params) => api.get('/trash', { params }),
  restore: (id) => api.post(`/trash/${id}/restore`),
  delete: (id) => api.delete(`/trash/${id}`),
  empty: () => api.delete('/trash'),
};

export default api;
