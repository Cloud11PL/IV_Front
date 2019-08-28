import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { authenticateUser } from '../../../../actions/authActions';

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.sendData();
  }


  sendData() {
    const { username, password } = this.state;
    const { authUser } = this.props;

    const formData = {
      username,
      password
    };
    authUser(formData);
  }

  handleChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  }

  render() {
    const { username, password } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="username">
          Username: 
          <input 
            value={username} 
            id="username" 
            type="text"
            onChange={this.handleChange}
          />
        </label>
        <label htmlFor="password">
          Password:
          <input 
            value={password} 
            id="password" 
            type="password"
            onChange={this.handleChange}
          />
        </label>
        <input type="submit" />
      </form>
    );
  }
}

LoginForm.propTypes = {
  authUser: propTypes.func,
};

LoginForm.defaultProps = {
  authUser: null,
};

const mapDispatchToProps = {
  authUser: authenticateUser,
};

export default connect(null, mapDispatchToProps)(LoginForm);
