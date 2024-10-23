import React, { useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';

const RoomSuggestion = () => {
  const { user } = useAuth0();
  const [formData, setFormData] = useState({
    max_cap: '',
    time_duration: '',
    date: '',
    user_email: user?.email,
    priority_no: '',
  });
  const [suggestedRooms, setSuggestedRooms] = useState([]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to your backend to suggest rooms
      const response = await axios.post('http://localhost:3001/suggest-rooms', formData);
      setSuggestedRooms(response.data); // Set the suggested rooms from the response
      console.log('Suggested rooms:', response.data);
    } catch (error) {
      console.error('Error fetching suggested rooms:', error);
      alert('Failed to fetch suggestions. Please try again.');
    }
  };

  
  return (
    <div>
      <h1>Suggest Rooms</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Maximum Capacity:</label>
          <input
            type="number"
            name="max_cap"
            value={formData.max_cap}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Time Duration (in minutes):</label>
          <input
            type="number"
            name="time_duration"
            value={formData.time_duration}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Priority Number:</label>
          <input
            type="number"
            name="priority_no"
            value={formData.priority_no}
            onChange={handleChange}
            min="0"
            required
          />
        </div>
        <button type="submit">Suggest Rooms</button>
      </form>

      {suggestedRooms.length > 0 && (
        <div>
          <h2>Suggested Rooms:</h2>
          <ul>
            {suggestedRooms.map((room, index) => (
              <li key={index}>
                Floor: {room.floor_no}, Room: {room.room_no}, Capacity: {room.capacity}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default RoomSuggestion;