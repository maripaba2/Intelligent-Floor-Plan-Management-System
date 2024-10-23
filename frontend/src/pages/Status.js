import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Status = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        // Replace the URL with your API endpoint for fetching bookings
        const response = await axios.get('http://localhost:3001/bookings');
        setBookings(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching bookings.');
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>All Users' Bookings</h1>
      <table>
        <thead>
          <tr>
            <th>Floor No</th>
            <th>Room No</th>
            <th>Max Capacity</th>
            <th>Time Duration (minutes)</th>
            <th>Date</th>
            <th>Email</th>
            <th>Priority No</th>
          </tr>
        </thead>
        <tbody>
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <tr key={booking._id}>
                <td>{booking.floor_no}</td>
                <td>{booking.room_no}</td>
                <td>{booking.max_cap}</td>
                <td>{booking.time_duration}</td>
                <td>{new Date(booking.date).toISOString().split('T')[0]}</td> {/* Format date */}
                <td>{booking.user_email}</td>
                <td>{booking.priority_no}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No bookings found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Status;