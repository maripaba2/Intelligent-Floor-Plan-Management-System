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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const openModal1 = () => setIsModalOpen1(true);
  const closeModal1 = () => setIsModalOpen1(false);

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
        closeModal();
        alert('Floor added successfully');
        setFloorNo('');
        window.location.reload();
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
          closeModal();
          alert('Room added successfully');
          setRoomNo('');
          setCapacity('');
          setDescription('');
          window.location.reload()
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
    <div className="container mx-auto p-8 min-h-[84vh]">
      <h1 className="text-4xl font-bold mb-6">Admin Dashboard</h1>


      

      <div className='flex justify-center'>
  <button 
    onClick={openModal1} 
    className="block text-white bg-blue-600 hover:bg-blue-700 transition duration-200 ease-in-out focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-700 shadow-lg"
    type="button">
    Add Floor
  </button>

  {isModalOpen1 && (
    <div id="defaultModal" className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-gray-900 bg-opacity-50 backdrop-blur-sm">
      <div className="relative p-6 w-full max-w-lg max-h-full">
        <div className="relative bg-white rounded-lg shadow-lg dark:bg-gray-800">
          <div className="flex items-center justify-between p-4 border-b dark:border-gray-600 rounded-t-lg">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Add Floor</h3>
            <button 
              onClick={closeModal1} 
              className="text-gray-400 hover:text-gray-900 hover:bg-gray-200 rounded-lg p-2 dark:hover:bg-gray-600 dark:hover:text-white transition duration-200 ease-in-out">
              <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6" />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          
          <div className="p-6 space-y-6">
            <input 
              type="number" 
              placeholder="Enter Floor Number" 
              value={floorNo} 
              onChange={(e) => setFloorNo(e.target.value)} 
              className="block w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:border-gray-600 dark:focus:ring-blue-500"
            />
          </div>
          
          <div className="flex items-center p-6 space-x-4 border-t dark:border-gray-600 rounded-b-lg">
            <button 
              onClick={addFloor} 
              className="w-full px-4 py-2 text-white bg-green-600 hover:bg-green-700 transition duration-200 ease-in-out focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg shadow-lg dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-700">
              Add Floor
            </button>
            <button 
              onClick={closeModal1} 
              className="w-full px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-blue-700 transition duration-200 ease-in-out focus:outline-none focus:ring-4 focus:ring-gray-300 dark:bg-gray-700 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-700">
              Decline
            </button>
          </div>
        </div>
      </div>
    </div>
  )}
</div>





      {/* Select Floor */}
      <div className="mb-8">
  <div className="text-2xl font-semibold mb-4 border-2 border-black w-1/4 rounded-lg p-2 mt-8 m-auto">
    Select Floor
  </div>
  <select
    value={selectedFloor}
    onChange={(e) => setSelectedFloor(e.target.value)}
    className="select select-bordered w-full max-w-xs mb-4 mt-4 border-2 border-gray-300 rounded-lg p-2 focus:border-blue-500 focus:outline-none transition duration-150"
  >
    <option value="">Select a floor</option>
    {floors.map((floor) => (
      <option key={floor._id} value={floor._id}>
        Floor {floor.floor_no} (Version: {floor.version})
      </option>
    ))}
  </select>
  

        {/* Delete Floor Button - Only visible when a floor is selected */}
        {selectedFloor && (
          <button 
            onClick={() => deleteFloor(selectedFloor)} 
            className="p-2 ml-4 text-white bg-red-500 hover:bg-red-700 transition duration-200 ease-in-out focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg shadow-lg dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-700">
            Delete Floor
          </button>
        )}
          
      </div>

      {/* Manage Rooms for the Selected Floor */}
      {selectedFloor && (
        <>
          {/* Add Room to Selected Floor */}
          <div className='mt-8 '>
  <button 
    onClick={openModal} 
    className="block text-white bg-blue-600 hover:bg-blue-700 transition duration-200 ease-in-out focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-700 shadow-lg relative left-2/4 top-10 "
    type="button">
    Add room
  </button>

  {isModalOpen && (
    <div id="defaultModal" className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-gray-900 bg-opacity-50 backdrop-blur-sm">
      <div className="relative p-6 w-full max-w-lg max-h-full">
        <div className="relative bg-white rounded-lg shadow-lg dark:bg-gray-800">
          <div className="flex items-center justify-between p-4 border-b dark:border-gray-600 rounded-t-lg">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Add Floor</h3>
            <button 
              onClick={closeModal} 
              className="text-gray-400 hover:text-gray-900 hover:bg-gray-200 rounded-lg p-2 dark:hover:bg-gray-600 dark:hover:text-white transition duration-200 ease-in-out">
              <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6" />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          
          <div className="p-6 space-y-6">


            <input 
              type="text" 
              placeholder="Room Number" 
              value={roomNo} 
              onChange={(e) => setRoomNo(e.target.value)} 
              className="block w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:border-gray-600 dark:focus:ring-blue-500"
            />
            <input 
              type="number" 
              placeholder="Capacity" 
              value={capacity} 
              onChange={(e) => setCapacity(e.target.value)} 
              className="block w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:border-gray-600 dark:focus:ring-blue-500"
            />
            <input 
              type="text" 
              placeholder="Description" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              className="block w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:border-gray-600 dark:focus:ring-blue-500"
            />
          </div>
          
          <div className="flex items-center p-6 space-x-4 border-t dark:border-gray-600 rounded-b-lg">
            <button 
              onClick={addRoom}
              className="w-full px-4 py-2 text-white bg-green-600 hover:bg-green-700 transition duration-200 ease-in-out focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg shadow-lg dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-700">
              Add Room
            </button>
            <button 
              onClick={closeModal} 
              className="w-full px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-blue-700 transition duration-200 ease-in-out focus:outline-none focus:ring-4 focus:ring-gray-300 dark:bg-gray-700 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-700">
              Decline
            </button>
          </div>
        </div>
      </div>
    </div>
  )}
</div>



          {/* Existing Rooms */}
          <div className='flex w-fill '>
          <h4 className="text-3xl font-semibold mb-4 left ml-36 ">Rooms:</h4>
          </div>
       
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-4 w-full place-items-center">
          {/* //yaha sei bhai */}

            {/* {floors.find(floor => floor._id === selectedFloor)?.rooms.map((room) => (
              <div key={room._id} className="p-4 border rounded-lg shadow-md bg-gray-50">
                <p className="font-semibold">Room {room.room_no} (Capacity: {room.capacity})</p>
                <button 
                  onClick={() => {
                    setSelectedRoom({ floorId: selectedFloor, roomId: room._id });
                    setUpdateCapacity(room.capacity);
                    setUpdateDescription(room.description);
                  }} 
                  className="btn btn-warning">
                  Update Room
                </button>
                <button 
                  onClick={() => deleteRoom(room._id)} 
                  className="btn btn-danger ml-2">
                  Delete Room
                </button>
              </div>
            ))} */}
{
  floors.find(floor => floor._id === selectedFloor)?.rooms.map((room) => (
    <div
      className="flex flex-col sm:flex-row items-center p-4 sm:p-6 w-full  border-2 border-black bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-300"
      key={room._id}
    >
      {/* Image Container */}
      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full mb-4 sm:mb-0 sm:mr-4">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTS1ryB-XYLNFkWBXpBbjFNLDVvQQ6tz2KwlA&s"
          alt="profil"
          className="w-full h-full object-cover rounded-full"
        />
      </div>
      
      {/* Room Info */}
      <div className="flex-1 text-center sm:text-left">
        <p className=" text-gray-800 text-lg break-words">
          Room Number: <a className="font-bold"> {room.room_no}</a>
        </p>
        <p className="text-gray-800 text-lg">
          Capacity: <a className="font-bold">{room.capacity}</a>
        </p>
        
        {/* Buttons - Removed Absolute Positioning */}
        <div className="flex flex-col sm:flex-row justify-center sm:justify-start mt-4 space-y-2 sm:space-y-0 sm:space-x-2">
          <button
            className="text-emerald-500 bg-transparent border border-emerald-500 hover:bg-emerald-500 hover:text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded outline-none focus:outline-none ease-linear transition-all duration-150"
            onClick={() => {
              setSelectedRoom({ floorId: selectedFloor, roomId: room._id });
              setUpdateCapacity(room.capacity);
              setUpdateDescription(room.description);
            }}
          >
            Update Room
          </button>
          
          <button
            className="text-gray-800 bg-transparent border border-gray-800 hover:bg-gray-600 hover:text-white active:bg-gray-800 font-bold uppercase text-xs px-4 py-2 rounded outline-none focus:outline-none ease-linear transition-all duration-150"
            onClick={() => deleteRoom(room._id)}
          >
            Delete Room
          </button>
        </div>
      </div>
    </div>
  ))
}


          </div>
        </>
      )}

      {/* Update Room Section */}
      {selectedRoom && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Update Room</h2>
          <input 
            type="number" 
            placeholder="New Capacity" 
            value={updateCapacity} 
            onChange={(e) => setUpdateCapacity(e.target.value)} 
            className="input input-bordered mb-4 w-full max-w-xs"
          />
          <input 
            type="text" 
            placeholder="New Description" 
            value={updateDescription} 
            onChange={(e) => setUpdateDescription(e.target.value)} 
            className="input input-bordered mb-4 w-full max-w-xs"
          />
          <button 
            onClick={updateRoom} 
            className="btn btn-warning">
            Update Room
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;





// {
//   floors.find(floor => floor._id === selectedFloor)?.rooms.map((room) => (
//     <div
//       className="flex flex-col sm:flex-row items-center p-4 sm:p-6 w-full  border-2 border-black bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-300"
//       key={room._id}
//     >
//       {/* Image Container */}
//       <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full mb-4 sm:mb-0 sm:mr-4">
//         <img
//           src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTS1ryB-XYLNFkWBXpBbjFNLDVvQQ6tz2KwlA&s"
//           alt="profil"
//           className="w-full h-full object-cover rounded-full"
//         />
//       </div>
      
//       {/* Room Info */}
//       <div className="flex-1 text-center sm:text-left">
//         <p className="font-bold text-gray-800 text-lg break-words">
//           Room Number: {room.room_no}
//         </p>
//         <p className="text-gray-800 text-lg">
//           Capacity: {room.capacity}
//         </p>
        
//         {/* Buttons - Removed Absolute Positioning */}
//         <div className="flex flex-col sm:flex-row justify-center sm:justify-start mt-4 space-y-2 sm:space-y-0 sm:space-x-2">
//           <button
//             className="text-emerald-500 bg-transparent border border-emerald-500 hover:bg-emerald-500 hover:text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded outline-none focus:outline-none ease-linear transition-all duration-150"
//             onClick={() => {
//               setSelectedRoom({ floorId: selectedFloor, roomId: room._id });
//               setUpdateCapacity(room.capacity);
//               setUpdateDescription(room.description);
//             }}
//           >
//             Update Room
//           </button>
          
//           <button
//             className="text-gray-800 bg-transparent border border-gray-800 hover:bg-gray-600 hover:text-white active:bg-gray-800 font-bold uppercase text-xs px-4 py-2 rounded outline-none focus:outline-none ease-linear transition-all duration-150"
//             onClick={() => deleteRoom(room._id)}
//           >
//             Delete Room
//           </button>
//         </div>
//       </div>
//     </div>
//   ))
// }




      {/* {floors.find(floor => floor._id === selectedFloor)?.rooms.map((room) => (
              <div key={room._id} className="p-4 border rounded-lg shadow-md bg-gray-50">
                <p className="font-semibold">Room {room.room_no} (Capacity: {room.capacity})</p>
                <button 
                  onClick={() => {
                    setSelectedRoom({ floorId: selectedFloor, roomId: room._id });
                    setUpdateCapacity(room.capacity);
                    setUpdateDescription(room.description);
                  }} 
                  className="btn btn-warning">
                  Update Room
                </button>
                <button 
                  onClick={() => deleteRoom(room._id)} 
                  className="btn btn-danger ml-2">
                  Delete Room
                </button>
              </div>
            ))} */}