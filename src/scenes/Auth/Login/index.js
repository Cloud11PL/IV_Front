import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import propTypes from 'prop-types';

import NavBar from '../../components/NavBar';
import LoginForm from './components/LoginForm';
import useLoggedInStatus from '../../components/useLoggedInStatus';

function Login(props) {
  const loginStatus = useLoggedInStatus();
  useEffect(() => {
    if (loginStatus) {
      props.history.push('/dashboard');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginStatus]);
    return (
      <div>
        <NavBar />
        <div className="login">
          <div className="login__form">
            <p className="login__form--title">Login</p>
            <LoginForm /> 
          </div>
        </div>
      </div>
    );
}

Login.propTypes = {
  history: propTypes.shape({
    push: propTypes.func.isRequired
  }).isRequired,
};

export default withRouter(Login);
