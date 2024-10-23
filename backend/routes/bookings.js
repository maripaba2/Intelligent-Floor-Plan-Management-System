const express = require('express');
const router = express.Router();
const Floor = require('../Models/Floor');
const Booking = require('../Models/Booking');

// Create a new booking
router.post('/', async (req, res) => {
    const { floor_no, room_no, max_cap, time_duration, date, priority_no, user_email } = req.body;
  
    // Create new booking with the provided details
    const newBooking = new Booking({
      floor_no,
      room_no,
      max_cap,
      time_duration,
      date,
      priority_no,   // Accepting priority_no from frontend
      user_email,
    });
  
    try {
      // Save the booking to the database
      
      const savedBooking = await newBooking.save();
      console.log(newBooking);
      res.status(201).json(savedBooking);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  router.get('/', async (req, res) => {
    try {
      const bookings = await Booking.find({}); // Fetch all bookings from the database
      res.json(bookings); // Return bookings as JSON
    } catch (error) {
      res.status(500).json({ message: error.message }); // Handle errors
    }
  });

  router.get('/floors', async (req, res) => {
    try {
      const floors = await Floor.find({});
      console.log(floors);
      
      res.json(floors);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

module.exports = router;