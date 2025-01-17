import { React, useEffect, useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';


const Navbar2 = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { loginWithRedirect } = useAuth0();
  const { logout } = useAuth0();
  const { user, isAuthenticated, isLoading } = useAuth0();


  const handleSubmit = async () => {
    
    // Check if the user is authenticated
    if (!isAuthenticated) {
      console.error('User is not authenticated');
      return;
    }
    
    // Create the user data object using Auth0 user info
    const userData = {
      username: user.name, // You can use either 'nickname' or 'name'
      useremail: user.email, // Access the user email
      userimage: user.picture
    };
         
    try {
      // Send POST request to backend
      const response = await axios.post('http://localhost:3001/user', userData); // Updated URL
      console.log('User added:', response.data); // Handle success (you can add more logic here)
      
      } catch (error) {
          console.error('Error adding user:', error.response ? error.response.data : error.message); // Handle errors
      }
  };

  useEffect(() => {
    if (isAuthenticated) {
      handleSubmit();
    }
  }, [isAuthenticated]);
 

  return (
    <div className="bg-black">
      <div className="px-4 py-3 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        <div className="relative flex items-center justify-between">
          <a
            href="/"
            aria-label="Company"
            title="Company"
            className="inline-flex items-center"
          >
            <svg
              className="w-8 text-green-400"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeWidth="2"
              strokeLinecap="round"
              strokeMiterlimit="10"
              stroke="currentColor"
              fill="none"
            >
              <rect x="3" y="1" width="7" height="12" />
              <rect x="3" y="17" width="7" height="6" />
              <rect x="14" y="1" width="7" height="6" />
              <rect x="14" y="11" width="7" height="12" />
            </svg>
            <span className="ml-2 text-xl font-bold tracking-wide text-gray-100 uppercase">
              Rishi
            </span>
          </a>
          <ul className="flex items-center hidden space-x-8 lg:flex">
              <li >
                <a
                  href="/booking"
                  className="font-medium tracking-wide text-gray-100 transition-colors duration-200 hover:text-teal-400 hover:underline"
                >
                  Book Room
                </a>
              </li>
              <li >
                <a
                  href="/suggestion"
                  className="font-medium tracking-wide text-gray-100 transition-colors duration-200 hover:text-teal-400 hover:underline"
                >
                  Smart Recomendation
                </a>
              </li>
              <li >
                <a
                  href="/status"
                  className="font-medium tracking-wide text-gray-100 transition-colors duration-200 hover:text-teal-400 hover:underline"
                >
                  Your Bookings
                </a>
              </li>
              {user?.email === 'jungharerishi@gmail.com' && (
                <li>
                  <a
                    href="/admin_dashboard"
                    className="font-medium tracking-wide text-gray-100 transition-colors duration-200 hover:text-teal-400 hover:underline"
                  >
                    Admin Dashboard
                  </a>
                </li>
              )}

          </ul>
          
          <ul className="flex items-center hidden space-x-8 lg:flex">
          <li>
              <div className=" text-white font-bold">
              {isAuthenticated ? (
                  <p>{user.name}</p>
                ) : (
                 <p></p>
                )}
              </div>
              
              
            </li>
          <li>
              <a
                
                className={`inline-flex items-center justify-center h-12 px-4 font-medium tracking-wide text-[#222831] transition duration-200 rounded shadow-md bg-[#EEEEEE] hover:bg-green-700 hover:text-white focus:shadow-outline focus:outline-none `}
                aria-label="Login"
                title="Login"
              >
                {isAuthenticated ? (
                  <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
                    Logout
                  </button>
                ) : (
                  <button onClick={() => loginWithRedirect()}>
                  Login
                </button>
                )}
              </a>
            </li>
          </ul>
          <div className="lg:hidden">
            <button
              aria-label="Open Menu"
              title="Open Menu"
              className="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline"
              onClick={() => setIsMenuOpen(true)}
            >
              <svg className="w-5 text-gray-600" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"
                />
                <path
                  fill="currentColor"
                  d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z"
                />
                <path
                  fill="currentColor"
                  d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"
                />
              </svg>
            </button>
            {isMenuOpen && (
              <div className="absolute top-0 left-0 w-full">
                <div className="p-5 bg-white border rounded shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <a
                        href="/"
                        aria-label="Company"
                        title="Company"
                        className="inline-flex items-center"
                      >
                        <svg
                          className="w-8 text-deep-purple-accent-400"
                          viewBox="0 0 24 24"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeMiterlimit="10"
                          stroke="currentColor"
                          fill="none"
                        >
                          <rect x="3" y="1" width="7" height="12" />
                          <rect x="3" y="17" width="7" height="6" />
                          <rect x="14" y="1" width="7" height="6" />
                          <rect x="14" y="11" width="7" height="12" />
                        </svg>
                        <span className="ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase">
                          Company
                        </span>
                      </a>
                    </div>
                    <div>
                      <button
                        aria-label="Close Menu"
                        title="Close Menu"
                        className="p-2 -mt-2 -mr-2 transition duration-200 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <svg className="w-5 text-gray-600" viewBox="0 0 24 24">
                          <path
                            fill="currentColor"
                            d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <nav>
                    <ul className="space-y-4">
                      {['Product', 'Features', 'Pricing', 'About us'].map((item) => (
                        <li key={item}>
                          <a
                            href="/"
                            aria-label={item}
                            title={item}
                            className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400 hover:underline"
                          >
                            {item}
                          </a>
                        </li>
                      ))}
                      <li>
                      {isAuthenticated ? (
        <button class="text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900"
         onClick={() => logout()}>
          Logout
        </button>
      ) : (
        <button class="text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900"
         onClick={() => loginWithRedirect()}>
          Login
        </button>
      )}
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar2;