import React, { useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const AdminDashboard = () => {
  const { user, isAuthenticated } = useAuth0();
  const navigate = useNavigate(); // Use useNavigate for navigation
  const [floors, setFloors] = useState([]);
  const [selectedFloor, setSelectedFloor] = useState('');
  const [floorNo, setFloorNo] = useState('');
  const [roomNo, setRoomNo] = useState('');
  const [capacity, setCapacity] = useState('');
  const [description, setDescription] = useState('');
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [updateCapacity, setUpdateCapacity] = useState('');
  const [updateDescription, setUpdateDescription] = useState('');
  const [isAdmin, setIsAdmin] = useState(true); // State to track if user is admin

  useEffect(() => {
    const fetchUserRole = async () => {
      if (isAuthenticated && user) {
        try {
          const result = await axios.get('http://localhost:3001/admin/user-role', {
            headers: {
              'Content-Type': 'application/json',
            },
            params: {
              user_email: user.email // Send user email as a query parameter
            }
          });
          setIsAdmin(result.data.role); // Set isAdmin based on user role
          console.log(result.data.role);
          
        } catch (err) {
          console.error('Error fetching user role:', err);
        }
      }
    };

    fetchUserRole();
  }, [isAuthenticated, user]); // Dependencies: isAuthenticated and user

  // Redirect if not admin
  useEffect(() => {
    if (isAuthenticated && !isAdmin) {
      alert('Access denied: You do not have permission to access this page.');
      navigate('/'); // Redirect to home or another page
    }
  }, [isAuthenticated, isAdmin, navigate]);

  useEffect(() => {
    const fetchFloors = async () => {
      if (isAuthenticated && user) {
        try {
          const result = await axios.get('http://localhost:3001/admin/floors', {
            headers: {
              'Content-Type': 'application/json',
            },
            params: {
              user_email: user.email
            }
          });
          setFloors(result.data);
          console.log(result.data);
        } catch (err) {
          console.error('Error fetching floors:', err);
        }
      }
    };

    fetchFloors();
  }, [isAuthenticated, user]);

  const addFloor = async () => {
    if (user) {
      try {
        await axios.post('http://localhost:3001/admin/add-floor', { 
          floor_no: floorNo 
        }, {
          params: { user_email: user.email }
        });
        alert('Floor added successfully');
        setFloorNo('');
      } catch (err) {
        alert('Error adding floor');
      }
    }
  };

  const addRoom = async () => {
    if (selectedFloor) {
      const floorId = selectedFloor;
      if (user) {
        try {
          await axios.post(`http://localhost:3001/admin/add-room/${floorId}`, {
            roomNo, 
            capacity, 
            description 
          }, {
            params: { user_email: user.email }
          });
          alert('Room added successfully');
          setRoomNo('');
          setCapacity('');
          setDescription('');
        } catch (err) {
          alert('Error adding room');
        }
      }
    }
  };

  const updateRoom = async () => {
    if (selectedRoom) {
      const { floorId, roomId } = selectedRoom;
      if (user) {
        try {
          await axios.put(`http://localhost:3001/admin/update-room/${floorId}/${roomId}`, {
            capacity: updateCapacity, 
            description: updateDescription 
          }, {
            params: { user_email: user.email }
          });
          alert('Room updated successfully');
          setSelectedRoom(null);
          setUpdateCapacity('');
          setUpdateDescription('');
        } catch (err) {
          alert('Error updating room');
        }
      }
    }
  };

  const deleteFloor = async (floorId) => {
    if (user) {
      try {
        await axios.delete(`http://localhost:3001/admin/remove-floor/${floorId}`, {
          params: { user_email: user.email }
        });
        alert('Floor deleted successfully');
        setFloors(floors.filter(floor => floor._id !== floorId));
      } catch (err) {
        alert('Error deleting floor');
      }
    }
  };

  const deleteRoom = async (roomId) => {
    if (selectedFloor && user) {
      try {
        await axios.delete(`http://localhost:3001/admin/remove-room/${selectedFloor}/${roomId}`, {
          params: { user_email: user.email }
        });
        alert('Room deleted successfully');
        setSelectedFloor(selectedFloor);
      } catch (err) {
        alert('Error deleting room');
      }
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>

      {/* Add Floor Section */}
      <h2>Add Floor</h2>
      <input type="number" placeholder="Floor Number" value={floorNo} onChange={(e) => setFloorNo(e.target.value)} />
      <button onClick={addFloor}>Add Floor</button>

      {/* Select Floor */}
      <h2>Select Floor</h2>
      <select value={selectedFloor} onChange={(e) => setSelectedFloor(e.target.value)}>
        <option value="">Select a floor</option>
        {floors.map((floor) => (
          <option key={floor._id} value={floor._id}>
            Floor {floor.floor_no}
          </option>
        ))}
      </select>

      {/* Manage Rooms for the Selected Floor */}
      {selectedFloor && (
        <>
          {/* Add Room to Selected Floor */}
          <h2>Add Room</h2>
          <input type="text" placeholder="Room Number" value={roomNo} onChange={(e) => setRoomNo(e.target.value)} />
          <input type="number" placeholder="Capacity" value={capacity} onChange={(e) => setCapacity(e.target.value)} />
          <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
          <button onClick={addRoom}>Add Room</button>

          {/* Existing Rooms */}
          <h4>Rooms:</h4>
          {floors.find(floor => floor._id === selectedFloor)?.rooms.map((room) => (
            <div key={room._id}>
              <p>Room {room.room_no} (Capacity: {room.capacity})</p>
              <button onClick={() => {
                setSelectedRoom({ floorId: selectedFloor, roomId: room._id });
                setUpdateCapacity(room.capacity);
                setUpdateDescription(room.description);
              }}>Update Room</button>
              <button onClick={() => deleteRoom(room._id)}>Delete Room</button>
            </div>
          ))}
        </>
      )}

      {/* Update Room Section */}
      {selectedRoom && (
        <div>
          <h2>Update Room</h2>
          <input 
            type="number" 
            placeholder="New Capacity" 
            value={updateCapacity} 
            onChange={(e) => setUpdateCapacity(e.target.value)} 
          />
          <input 
            type="text" 
            placeholder="New Description" 
            value={updateDescription} 
            onChange={(e) => setUpdateDescription(e.target.value)} 
          />
          <button onClick={updateRoom}>Submit Update</button>
          <button onClick={() => setSelectedRoom(null)}>Cancel</button>
        </div>
      )}

      {/* Delete Floor Section */}
      <h4>Delete Floors:</h4>
      {floors.map((floor) => (
        <div key={floor._id}>
          <span>Floor {floor.floor_no}</span>
          <button onClick={() => deleteFloor(floor._id)}>Delete Floor</button>
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;