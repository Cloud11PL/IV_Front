import React, { useEffect, Component } from 'react';

import NavBar from '../components/NavBar';

export default function Dashboard() {
// export default class Dashboard extends Component {

  useEffect(() => {
    console.log('Dashboard!');
  });

  // render() {
    return (
      <div>
        <NavBar />
        <h1>Woo hoo youre here nice</h1>
      </div>
    );
  // }
}
