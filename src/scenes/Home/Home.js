import React from 'react';

import NavBar from '../components/NavBar';
import Header from './components/Header';

export default function Home() {
  return (
    <div>
      <NavBar />
      <div className="scene-container">
        <Header />
      </div>
    </div>
  );
}
