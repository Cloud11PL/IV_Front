import React from 'react';
import { Route } from 'react-router-dom';

import Home from './scenes/Home/Home';
import LoggedIn from './components/auth/LoggedIn';
import Login from './components/auth/Login';

export default (
  <Route path="/" component={Home}>
    <Route path="login" component={Login} />
    <Route path="dashboard" component={LoggedIn} />
  </Route>
);
