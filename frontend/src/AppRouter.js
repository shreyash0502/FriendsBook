// Routes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import FriendsComponent from './FriendsComponent';
import App from './App'

const AppRouter = () => {
  return (
    <Routes>
	  <Route path="/" element={<App />} />
      <Route path="/friends-network" element={<FriendsComponent />} />
      {/* Define more routes as needed */}
    </Routes>
  );
};

export default AppRouter;

