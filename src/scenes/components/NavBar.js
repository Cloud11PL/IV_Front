import React, { useEffect, Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import useLoggedInStatus from './useLoggedInStatus';

// class NavBar extends Component {
export default function NavBar() {
  // render() {
  // const { loggedIn } = this.props;
  useEffect(() => {
    console.log('NavBar effect!');
  });
  const isLoggedIn = useLoggedInStatus;
    return (
      <div>
        <ul>
          <li><Link to="/">Home</Link></li>
          {!isLoggedIn 
            && <li><Link to="/login">Login</Link></li>}
          {isLoggedIn 
            && <li><Link to="/dashboard">Dashboard</Link></li>}
        </ul>
      </div>
    );
  // }
}

// NavBar.propTypes = {
//   loggedIn: propTypes.bool,
// };

// NavBar.defaultProps = {
//   loggedIn: false,
// };

// const mapStateToProps = (state) => ({
//   loggedIn: state.auth.isLoggedIn
// });


// export default connect(mapStateToProps, null)(NavBar);
