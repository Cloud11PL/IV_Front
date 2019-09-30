import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import homeicon from './assets/home-icon.png';
import loginicon from './assets/logout-icon.png';
import logouticon from './assets/logout-icon.png';
import dashboardicon from './assets/dashboard-icon.png';

import useLoggedInStatus from './useLoggedInStatus';


export default function NavBar() {
  useEffect(() => {
  });
  const isLoggedIn = useLoggedInStatus();
  return (
    <aside className="navbar">
      <NavLink to="/" className="navbar__item" exact activeClassName="navbar__item--active">
        <img src={homeicon} alt="home-icon" className="navbar__icon" />
        <p className="navbar__text">Home</p>
      </NavLink>
      {!isLoggedIn 
          && (
            <NavLink to="/login" className="navbar__item" activeClassName="navbar__item--active">
              <img src={loginicon} alt="login-icon" className="navbar__icon" />
              <p className="navbar__text">Login</p>
            </NavLink>
          )}
      {isLoggedIn 
          && (
            <NavLink to="/dashboard" className="navbar__item" activeClassName="navbar__item--active">
              <img src={dashboardicon} alt="dashboard-icon" className="navbar__icon" />
              <p className="navbar__text">Dashboard</p>
            </NavLink>
          )}
      {isLoggedIn 
          && (
            <NavLink to="/logout" className="navbar__item" activeClassName="navbar__item--active">
              <img src={logouticon} alt="dashboard-icon" className="navbar__icon" />
              <p className="navbar__text">Log out</p>
            </NavLink>
          )}
    </aside>
  );
}
