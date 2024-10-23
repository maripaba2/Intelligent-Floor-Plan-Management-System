import {React , useEffect} from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';


const Navbar = () => {
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
    <div>
        { !isAuthenticated &&<button onClick={() => loginWithRedirect()}>Log In</button>}
        {isAuthenticated && <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
            Log Out
        </button>}

        {isAuthenticated && (
        <div>
            <img referrerPolicy='no-referrer' src={user.picture} alt={user.name} />
            <h2>{user.name}</h2>
            <p>{user.email}</p>
        </div>
        )}
    </div>
  )
}

export default Navbar