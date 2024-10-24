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
      setSuggestedRooms([response.data]); // Set the best room as an array for consistency in rendering
      
      console.log('Suggested room:', response.data);
    } catch (error) {
      console.error('Error fetching suggested room:', error);
      alert('Failed to fetch suggestions. Please try again.');
    }
  };
  
  

  
  return (
    <div className='flex flex-row justify-around'>




<div class="min-h-screen py-6 flex flex-col justify-center sm:py-12">
        <div class="relative py-3 sm:max-w-xl sm:mx-auto">
            <div
                class="absolute inset-0 bg-gradient-to-r from-[#A0D683] to-green-400 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
            </div>
            <div class="text-white relative px-4 py-10 bg-gray-900 shadow-lg sm:rounded-3xl sm:p-20">

                <div class="text-center pb-6">
                    <h1 class="text-3xl">Suggest Rooms</h1>
                    {/* 
                    <p class="text-gray-300">
                        Fill up the form below to send us a message.
                    </p> */}
                </div>

                <form onSubmit={handleSubmit}>


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
     
        <button class="shadow bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Suggest Rooms</button>

              

                </form>
            </div>
        </div>
    </div>


    <div class="min-h-screen py-6  flex flex-col justify-center sm:py-12">
  {suggestedRooms.length > 0 && (
    <div className="card bg-base-100 w-96 shadow-xl rounded-lg ">
    {suggestedRooms.map((room, index) => (

<div className="card bg-base-100 w-96 shadow-xl rounded-xl">
  <figure>
    <img
    className="rounded-t-xl "
      src="https://e6ntme5rpbf.exactdn.com/wp-content/uploads/2023/07/dunedin-city-council-conference-room-buro-metro-II-chairs.jpg?strip=all&lossy=1&ssl=1"
      alt="room" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">Suggested Room:</h2>
    <div class="flex justify-center p-5 text-slate-700">
                <div class="text-center mr-3 border-r pr-3 last:border-r-0">
                    <span>Floor: {room.floor_no}</span>
                </div>
                <div class="text-center mr-3 border-r pr-3 last:border-r-0">
                    <span>Room: {room.room_no}</span>
                </div>
                <div class="text-center mr-3 border-r pr-3 last:border-r-0">
                    <span>Capacity: {room.capacity}</span>
                </div>
            </div>
    <div className="card-actions justify-end">
      <button className="btn btn-primary">Book Now</button>
    </div>
  </div>
</div>


))} </div> )}
</div>

    </div>
  );
};

export default RoomSuggestion;