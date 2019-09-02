import React, { Component } from 'react';

import NavBar from '../components/NavBar';
import Header from './components/Header';

export default class Home extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Header />
      </div>
    );
  }
}
