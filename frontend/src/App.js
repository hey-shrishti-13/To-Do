import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import Home from './pages/Home';
import Trash from './pages/Trash';
import Archive from './pages/Archive';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/trash" element={<Trash />} />
          <Route path="/archive" element={<Archive />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
