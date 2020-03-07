import React, { useEffect } from 'react';

import NavBar from '../components/NavBar';
import DeviceContainer from './components/DeviceContainer';

export default function Dashboard() {
  useEffect(() => {
    console.log('Dashboard!');
  });

    return (
      <div className="dashboard__container">
        <NavBar />
        <div className="scene-container">

          <h1>Device dashboard</h1>
          <DeviceContainer />
        </div>
      </div>
    );
}
