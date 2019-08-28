import React, { Component } from 'react'
import { connect } from 'react-redux';
import { authenticateUser } from '../../actions/authActions'
import { withRouter } from 'react-router-dom';
import store from '../../store'

import LoggedIn from './LoggedIn'

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidUpdate() {
    if(this.props.loggedIn) {
      console.log('No elo!')
      // this.props.history.push('/dashboard')
      this.props.history.push('/dashboard')
    }
  }

  

  handleSubmit(e) {
    e.preventDefault();
    this.sendData();
  }

  handleChange(e) {
    this.setState({[e.target.id]: e.target.value})
  }
  sendData() {
    const formData = {
      username: this.state.username,
      password: this.state.password
    }
    this.props.authenticateUser(formData)
  }


  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} >
          <label>Username: </label>
            <input 
              value={this.state.username} 
              id="username" 
              type="text"
              onChange={this.handleChange}
              ></input>
          <label>Password: </label>
          <input 
              value={this.state.password} 
              id="password" 
              type="password"
              onChange={this.handleChange}              
              ></input>
          <input type="submit" />
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  loggedIn: state.auth.isLoggedIn
});


export default withRouter(connect(
  mapStateToProps,
  {
    authenticateUser
  }
)(Login));