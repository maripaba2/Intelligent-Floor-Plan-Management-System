import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import UserBooking from './pages/UserBooking';
import Home from './pages/Home';
import AdminDashboard from './pages/AdminDashboard';
import RoomSuggestion from './pages/RoomSuggestion';
import Status from './pages/Status';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/booking" element={<UserBooking />} />
        <Route path="/suggestion" element={<RoomSuggestion />} />
        <Route path="/status" element={<Status />} />
        <Route path="/admin_dashboard" element={<AdminDashboard />} />
      </Routes>
      <Footer/>
    </div>
  </Router>

  );
}

export default App;