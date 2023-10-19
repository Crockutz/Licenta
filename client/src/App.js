// src/App.js
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import './App.css';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<LandingPage />} />
          <Route path="/dashboard" element={<DashboardPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
