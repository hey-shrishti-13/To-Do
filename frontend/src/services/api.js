import axios from 'axios';


const api = axios.create({
  baseURL: "https://todo-backend-weqm.onrender.com",
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    console.log('API Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    if (error.response) {
      // Server responded with error status
      console.error('Error Status:', error.response.status);
      console.error('Error Data:', error.response.data);
    } else if (error.request) {
      // Request made but no response
      console.error('No response received. Check if backend is running.');
    }
    return Promise.reject(error);
  }
);

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
