import React from 'react';
import './App.css';
import FloorPlan from './components/FloorPlan';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <h1>Floor Plan Management System</h1>
      <FloorPlan />
    </div>
  );
}

export default App;