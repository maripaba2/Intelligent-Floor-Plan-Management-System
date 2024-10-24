import React, { useEffect, useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';

const Status = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, isAuthenticated } = useAuth0();
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('http://localhost:3001/bookings');
        setBookings(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching bookings.');
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchBookings();
    }
  }, [isAuthenticated]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Filter the bookings to show only the current user's bookings
  const userBookings = bookings.filter(booking => booking.user_email === user.email);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-semibold mb-4">Your Bookings</h1>
      <div className="overflow-x-auto">
        <table className="w-full table-auto bg-white rounded-lg shadow-lg border-collapse">
          <thead>
            <tr className="text-left bg-gray-100 border-b-2">
              <th className="pl-4 py-3 text-center">Floor No</th>
              <th className="pl-4 py-3 text-center">Room No</th>
              <th className="pl-4 py-3 text-center">Max Capacity</th>
              <th className="pl-4 py-3 text-center">Time Duration (minutes)</th>
              <th className="pl-4 py-3 text-center">Date</th>
              <th className="pl-4 py-3 text-center">Priority No</th>
            </tr>
          </thead>
          <tbody>
            {userBookings.length > 0 ? (
              userBookings.map((booking) => (
                <tr key={booking._id} className="border-t hover:bg-gray-50">
                  <td className="py-4 pl-4 text-center">{booking.floor_no}</td>
                  <td className="py-4 pl-4 text-center">{booking.room_no}</td>
                  <td className="py-4 pl-4 text-center">{booking.max_cap}</td>
                  <td className="py-4 pl-4 text-center">{booking.time_duration}</td>
                  <td className="py-4 pl-4 text-center">
                    {new Date(booking.date).toISOString().split('T')[0]}
                  </td>
                  <td className="py-4 pl-4 text-center">{booking.priority_no}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-6">No bookings found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Status;