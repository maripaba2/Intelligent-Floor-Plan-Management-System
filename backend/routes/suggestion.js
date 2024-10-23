const express = require('express');
const Floor = require('../Models/Floor'); // Ensure this is your model for fetching floors and rooms
const Booking = require('../Models/Booking'); // Ensure this is your model for booking
const router = express.Router();


const formatDate = (date) => {
  return new Date(date).toISOString().split('T')[0];
};

// Endpoint to suggest rooms based on criteria
router.post('/', async (req, res) => {
  const { max_cap, time_duration, date, priority_no } = req.body;

  try {
    // Fetch all floors and rooms
    const floors = await Floor.find({});
    
    // Fetch all bookings for the specified date
    const bookings = await Booking.find({ date });

    // Implement your room suggestion algorithm here
    const suggestedRooms = [];

    // Sample algorithm: Filter rooms based on capacity, availability, and other criteria
    floors.forEach(floor => {
      floor.rooms.forEach(room => {
        // Check if the room has sufficient capacity
        if (room.capacity >= max_cap) {
          // Check if the room is booked on the given date and time duration
          const isRoomBooked = bookings.some(booking => 
            booking.room_no === room.room_no &&
            booking.floor_no === floor.floor_no &&
            formatDate(booking.date) === date  // You can enhance the logic here to consider overlap of time durations
          );
          console.log(bookings);
          console.log(req.body);
          

          // If the room is not booked, add it to the suggested rooms
          if (!isRoomBooked) {
            suggestedRooms.push({
              floor_no: floor.floor_no,
              room_no: room.room_no,
              capacity: room.capacity,
              // Add more room details as needed
            });
          }
        }
      });
    });

    res.json(suggestedRooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;