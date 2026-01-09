import React, { useState, useEffect } from 'react';
import { foldersAPI, tasksAPI } from '../services/api';
import { useSearch } from '../components/Layout';
import FolderCard from '../components/FolderCard';
import TaskCard from '../components/TaskCard';
import NewCard from '../components/NewCard';
import Modal from '../components/Modal';
import TaskForm from '../components/TaskForm';
import FolderForm from '../components/FolderForm';
import './Home.css';

const Home = () => {
  const { searchQuery } = useSearch();
  const [folders, setFolders] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedFolderTab, setSelectedFolderTab] = useState('This Week');
  const [selectedTaskTab, setSelectedTaskTab] = useState('Todays');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showFolderModal, setShowFolderModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedFolderId, setSelectedFolderId] = useState(null);

  useEffect(() => {
    loadFolders();
  }, [sortBy, sortOrder]);

  useEffect(() => {
    loadTasks();
  }, [selectedFolderTab, selectedTaskTab, searchQuery, sortBy, sortOrder, selectedFolderId]);

  const loadFolders = async () => {
    try {
      const response = await foldersAPI.getAll({ sortBy, order: sortOrder });
      setFolders(response.data);
    } catch (error) {
      console.error('Error loading folders:', error);
    }
  };

  const loadTasks = async () => {
    try {
      const params = {
        search: searchQuery || undefined,
        sortBy,
        order: sortOrder,
        folderId: selectedFolderId || undefined,
      };
      const response = await tasksAPI.getAll(params);
      setTasks(response.data);
    } catch (error) {
      console.error('Error loading tasks:', error);
    }
  };

  const handleCreateFolder = async (folderData) => {
    try {
      await foldersAPI.create(folderData);
      loadFolders();
      setShowFolderModal(false);
    } catch (error) {
      console.error('Error creating folder:', error);
      alert('Error creating folder');
    }
  };

  const handleCreateTask = async (taskData, files) => {
    try {
      await tasksAPI.create(taskData, files);
      loadTasks();
      setShowTaskModal(false);
    } catch (error) {
      console.error('Error creating task:', error);
      alert('Error creating task');
    }
  };

  const handleUpdateTask = async (taskId, taskData, files) => {
    try {
      await tasksAPI.update(taskId, taskData, files);
      loadTasks();
      setShowTaskModal(false);
      setSelectedTask(null);
    } catch (error) {
      console.error('Error updating task:', error);
      alert('Error updating task');
    }
  };

  const handleCompleteTask = async (taskId, completed) => {
    try {
      await tasksAPI.update(taskId, { completed: completed.toString() });
      loadTasks();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await tasksAPI.delete(taskId);
      loadTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
      alert('Error deleting task');
    }
  };

  const handleDeleteFolder = async (folderId) => {
    try {
      await foldersAPI.delete(folderId);
      loadFolders();
      loadTasks();
    } catch (error) {
      console.error('Error deleting folder:', error);
      alert('Error deleting folder');
    }
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setShowTaskModal(true);
  };

  const handleFolderClick = (folder) => {
    if (selectedFolderId === folder._id) {
      setSelectedFolderId(null); // Deselect if clicking same folder
    } else {
      setSelectedFolderId(folder._id); // Filter by folder
    }
  };

  const filteredFolders = folders.filter(folder => {
    const folderDate = new Date(folder.createdAt);
    const now = new Date();
    const daysDiff = Math.floor((now - folderDate) / (1000 * 60 * 60 * 24));

    if (selectedFolderTab === 'Todays') return daysDiff === 0;
    if (selectedFolderTab === 'This Week') return daysDiff <= 7;
    if (selectedFolderTab === 'This Month') return daysDiff <= 30;
    return true;
  });

  const filteredTasks = tasks.filter(task => {
    const taskDate = new Date(task.createdAt);
    const now = new Date();
    const daysDiff = Math.floor((now - taskDate) / (1000 * 60 * 60 * 24));

    if (selectedTaskTab === 'Todays') return daysDiff === 0;
    if (selectedTaskTab === 'This Week') return daysDiff <= 7;
    if (selectedTaskTab === 'This Month') return daysDiff <= 30;
    return true;
  });

  return (
    <div className="home">
      <section className="section">
        <h2 className="section-title">Recent Folders</h2>
        <div className="tabs">
          {['Todays', 'This Week', 'This Month'].map(tab => (
            <button
              key={tab}
              className={`tab ${selectedFolderTab === tab ? 'active' : ''}`}
              onClick={() => setSelectedFolderTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="cards-grid">
          {filteredFolders.map(folder => (
            <FolderCard
              key={folder._id}
              folder={folder}
              onClick={handleFolderClick}
              onDelete={handleDeleteFolder}
              isSelected={selectedFolderId === folder._id}
            />
          ))}
          <NewCard type="folder" onClick={() => setShowFolderModal(true)} />
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <h2 className="section-title">
            My Notes
            {selectedFolderId && (
              <button 
                className="clear-filter-btn"
                onClick={() => setSelectedFolderId(null)}
                title="Clear folder filter"
              >
                ✕
              </button>
            )}
          </h2>
          <div className="sort-controls">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="createdAt">Date</option>
              <option value="title">Name</option>
            </select>
            <button
              className="sort-order-btn"
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            >
              {sortOrder === 'asc' ? '↑' : '↓'}
            </button>
          </div>
        </div>
        <div className="tabs">
          {['Todays', 'This Week', 'This Month'].map(tab => (
            <button
              key={tab}
              className={`tab ${selectedTaskTab === tab ? 'active' : ''}`}
              onClick={() => setSelectedTaskTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="cards-grid">
          {filteredTasks.map(task => (
            <TaskCard
              key={task._id}
              task={task}
              onClick={handleTaskClick}
              onComplete={handleCompleteTask}
              onDelete={handleDeleteTask}
            />
          ))}
          <NewCard type="note" onClick={() => {
            setSelectedTask(null);
            setShowTaskModal(true);
          }} />
        </div>
      </section>

      <Modal
        isOpen={showTaskModal}
        onClose={() => {
          setShowTaskModal(false);
          setSelectedTask(null);
        }}
        title={selectedTask ? 'Edit Task' : 'New Task'}
      >
        <TaskForm
          task={selectedTask}
          onSubmit={selectedTask 
            ? (data, files) => handleUpdateTask(selectedTask._id, data, files)
            : handleCreateTask
          }
        />
      </Modal>

      <Modal
        isOpen={showFolderModal}
        onClose={() => setShowFolderModal(false)}
        title="New Folder"
      >
        <FolderForm onSubmit={handleCreateFolder} />
      </Modal>
    </div>
  );
};

export default Home;
