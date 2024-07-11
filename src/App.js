import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from './store/authSlice'; // Adjust path as per your project structure
import { auth } from './firebaseconfig'; // Ensure correct path to your Firebase config

import Navbar from './components/navbar';
import Carousel from './carousel';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Check local storage for user data and token
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');

    if (user && token) {
      // Set user data in Redux store
      dispatch(setUser({ user, token }));
    }
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <Carousel />
      {/* Your other components and routes */}
    </div>
  );
}

export default App;
