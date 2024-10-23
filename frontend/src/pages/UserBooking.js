import React, { useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';

const UserBooking = () => {
  const { user, isAuthenticated } = useAuth0();
  const [formData, setFormData] = useState({
    floor_no: '',
    room_no: '',
    max_cap: '',
    time_duration: '',
    date: '',
    user_email: '',  // Initially set to empty, will be updated when user is loaded
    priority_no: '',
  });
  const [floors, setFloors] = useState([]); // State to hold floor data
  const [selectedFloor, setSelectedFloor] = useState('');

  // Set user email once the Auth0 user is available
  useEffect(() => {
    if (user) {
      setFormData(prevFormData => ({
        ...prevFormData,
        user_email: user.email,  // Set the user email once the user object is loaded
      }));
    }
  }, [user]);  // Run this effect when the user object changes

  useEffect(() => {
    const fetchFloors = async () => {
      try {
        const response = await axios.get('http://localhost:3001/bookings/floors');
        setFloors(response.data);
        console.log(response.data);
        
      } catch (error) {
        console.error('Error fetching floors:', error);
      }
    };

    fetchFloors();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to your backend to book the room
      const response = await axios.post('http://localhost:3001/bookings', formData);
      console.log('Booking successful:', response.data);
      alert('Booking Successful!');
    } catch (error) {
      console.error('Error booking the room:', error);
      alert('Booking Failed. Please try again.');
    }
  };

  return (
    <div>
      <h1>Book a Room</h1>
      <form onSubmit={handleSubmit}>
        
      </form>


      <div class="min-h-screen py-6 flex flex-col justify-center sm:py-12">
        <div class="relative py-3 sm:max-w-xl sm:mx-auto">
            <div
                class="absolute inset-0 bg-gradient-to-r from-[#A0D683] to-green-400 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
            </div>
            <div class="text-white relative px-4 py-10 bg-gray-900 shadow-lg sm:rounded-3xl sm:p-20">

                <div class="text-center pb-6">
                    <h1 class="text-3xl">Book a Room</h1>
                    {/* 
                    <p class="text-gray-300">
                        Fill up the form below to send us a message.
                    </p> */}
                </div>

                <form onSubmit={handleSubmit}>


                <div>
          <label>Floor Number:</label>
          <select
            class="shadow mb-4 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="floor_no"
            value={selectedFloor}
            onChange={(e) => {
              setSelectedFloor(e.target.value);
              setFormData({ ...formData, floor_no: e.target.value, room_no: '' }); // Reset room number
            }}
            required
          >
            <option value="">Select a floor</option>
            {floors.map((floor) => (
              <option key={floor._id} value={floor.floor_no}>
                Floor {floor.floor_no}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Room Number:</label>
          <select
            class="shadow mb-4 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="room_no"
            value={formData.room_no}
            onChange={handleChange}
            required
          >
            <option value="">Select a room</option>
            {selectedFloor &&
              floors
                .find(floor => floor.floor_no === Number(selectedFloor)) // Find selected floor
                ?.rooms.map((room) => (
                  <option key={room.room_no} value={room.room_no}>
                    Room {room.room_no}
                  </option>
                ))}
          </select>
        </div>

        <div>
          <label>Maximum Capacity:</label>
          <input
            class="shadow mb-4 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
            class="shadow mb-4 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
            class="shadow mb-4 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            class="shadow mb-4 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="email"
            name="user_email"
            value={formData.user_email}
            onChange={handleChange}
            required
            readOnly // Make the email field read-only since it’s auto-filled
          />
        </div>
        <div>
          <label>Priority Number:</label>
          <input
            class="shadow mb-4 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="number"
            name="priority_no"
            value={formData.priority_no}
            onChange={handleChange}
            min="0"
            required
          />
        </div>
        <button class="shadow bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Book Room</button>

              

                </form>
            </div>
        </div>
    </div>

    </div>
  );
};

export default UserBooking;