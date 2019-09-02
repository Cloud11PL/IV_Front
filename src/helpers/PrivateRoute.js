import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import propTypes from 'prop-types';
import useLoggedInStatus from '../scenes/components/useLoggedInStatus';
import SignInPage from '../scenes/Auth/Login';

let PrivateRoute;

export default PrivateRoute = ({ component, ...options }) => {
  const loggedInStatus = useLoggedInStatus();
  if (loggedInStatus) {
    return <Route {...options} component={component} />;
  } 
    return <Redirect component={SignInPage} to="/login" />;
};

PrivateRoute.propTypes = {
  location: propTypes.shape({
    pathname: propTypes.string.isRequired,
  }),
  component: propTypes.func.isRequired
};

PrivateRoute.defaultProps = {
  location: {
    pathname: '/'
  }
};
