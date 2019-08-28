import { useState, useEffect } from 'react';
// import propTypes from 'prop-types';
import { useSelector } from 'react-redux';
// import { createSelector } from 'reselect';

// const selectAuthStatus = crea

export default function useLoggedInStatus() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { loggedIn } = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    if (loggedIn !== undefined && loggedIn !== null) {
      setIsLoggedIn(loggedIn);
    }
    console.log('UseLoggedInStatus hir');
    // console.log(loggedIn);
  }, [isLoggedIn, loggedIn]);
  return isLoggedIn;
  // setIsLoggedIn(loggedIn);
}

// useLoggedInStatus.propTypes = {
//   loggedIn: propTypes.bool,
// };

// useLoggedInStatus.defaultProps = {
//   loggedIn: false,
// };

// const mapStateToProps = (state) => ({
//   loggedIn: state.auth.isLoggedIn
// });

// export default connect(mapStateToProps, null)(useLoggedInStatus);
