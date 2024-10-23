import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import UserBooking from './pages/UserBooking';
import Home from './pages/Home';
import AdminDashboard from './pages/AdminDashboard';
import RoomSuggestion from './pages/RoomSuggestion';

function App() {
  return (
    <Router>
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/booking" element={<UserBooking />} />
        <Route path="/suggestion" element={<RoomSuggestion />} />
        <Route path="/admin_dashboard" element={<AdminDashboard />} />
      </Routes>
    </div>
  </Router>

  );
}

export default App;