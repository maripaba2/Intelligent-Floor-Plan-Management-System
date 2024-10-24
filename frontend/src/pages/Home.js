import React from 'react';
import hehe from "./hehe.jpg";
import { useAuth0 } from "@auth0/auth0-react";

const Home = () => {
  const { user, isAuthenticated } = useAuth0();
  return (
    <div
      className="relative flex justify-center items-center min-h-[80vh]" // Flexbox for centering
      style={{ 
        height: '82vh', // Set the desired height
        backgroundImage: `url(${hehe})`, 
        backgroundSize: '180%', 
        backgroundPosition: 'center', 
        opacity: 0.9
      }}
    >
      <div className="flex flex-col justify-center items-center text-center"> {/* Flex column for stacking */}
      <h1 className="text-transparent bg-clip-text bg-green-100 text-6xl font-extrabold tracking-widest mb-8 leading-tight drop-shadow-lg">
  Welcome to Intelligent Floor 
</h1>
<h1 className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-5xl font-extrabold tracking-widest mb-8 leading-tight drop-shadow-lg">
  Plan Management System
</h1>



 {/* Added margin-bottom */}
        
        <div className="flex space-x-16 mt-12"> {/* Added margin-top to move buttons lower */}
          <button className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-8 py-2.5 dark:border-green-400 dark:text-green-400 dark:hover:text-white dark:hover:bg-green-500 dark:focus:ring-green-900"
          onClick={() => window.location.href = 'http://localhost:3000/booking'} >
            Book Now
          </button>
          <button className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-8 py-2.5 dark:border-green-400 dark:text-green-400 dark:hover:text-white dark:hover:bg-green-500 dark:focus:ring-green-900"
          onClick={() => window.location.href = 'http://localhost:3000/suggestion'}
          
          >
            Smart Recomendation
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;