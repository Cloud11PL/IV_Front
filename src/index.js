import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import store from './store/index';
import { authUser } from './actions/authActions';
import PrivateRoute from './helpers/PrivateRoute';

import Home from './scenes/Home/Home';
import Login from './scenes/Auth/Login';
import Dashboard from './scenes/Dashboard';

const user = JSON.parse(localStorage.getItem('user'));

if (user && user.token) {
  store.dispatch(authUser(user.token));
  console.log(user);
}

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <PrivateRoute path="/dashboard" component={Dashboard} />
    </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
