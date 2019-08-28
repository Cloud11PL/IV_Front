import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import propTypes from 'prop-types';

import NavBar from '../../components/NavBar';
import LoginForm from './components/LoginForm';

class Login extends Component {
  componentDidUpdate() {
    const { loggedIn, history } = this.props;
    if (loggedIn) {
      console.log('Login about to push to dashboard');
      history.push('/dashboard');
    }
  }


  render() {
    return (
      <div>
        <NavBar />
        <LoginForm />
      </div>
    );
  }
}

Login.propTypes = {
  loggedIn: propTypes.bool,
  history: propTypes.shape({
    push: propTypes.func.isRequired
  }).isRequired,
};

Login.defaultProps = {
  loggedIn: false,
};


const mapStateToProps = (state) => ({
  loggedIn: state.auth.isLoggedIn
});


export default withRouter(connect(
  mapStateToProps, null
)(Login));
