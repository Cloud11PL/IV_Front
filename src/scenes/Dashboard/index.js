import React, { useEffect } from 'react';

import NavBar from '../components/NavBar';
import DeviceContainer from './components/DeviceContainer';

export default function Dashboard() {
  useEffect(() => {
    console.log('Dashboard!');
  });

    return (
      <div>
        <NavBar />
        <h1>Woo hoo youre here nice</h1>
        <DeviceContainer />
      </div>
    );
}
