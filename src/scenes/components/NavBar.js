import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useLoggedInStatus from './useLoggedInStatus';

export default function NavBar() {
  useEffect(() => {
  });
  const isLoggedIn = useLoggedInStatus();
  return (
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        {!isLoggedIn 
          && <li><Link to="/login">Login</Link></li>}
        {isLoggedIn 
          && <li><Link to="/dashboard">Dashboard</Link></li>}
        {isLoggedIn 
          && <li><Link to="/logout">Log Out</Link></li>}
      </ul>
    </div>
  );
}
