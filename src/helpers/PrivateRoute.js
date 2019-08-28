import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import propTypes from 'prop-types';
import store from '../store';
import useAuthDataContext from '../scenes/components/useLoggedInStatus';
import SignInPage from '../scenes/Auth/Login';

// export default function PrivateRoute({ component: Component, ...rest }) {
//   return (
//     <Route
//       {...rest}
//       render={(props) => (store.getState().auth.isLoggedIn === true
//         ? <Component {...props} />
//         : <Redirect to={{ pathname: '/', state: { from: props.location } }} />)}
//     />
//   );
// }
let PrivateRoute;

export default PrivateRoute = ({ component, ...options }) => {
  const user = useAuthDataContext;
  console.log('PrivateRoute mysli ze hook to', user);
  const finalComponent = user ? component : SignInPage;

  return <Route {...options} component={finalComponent} />;
};

// PrivateRoute.propTypes = {
//   location: propTypes.shape({
//     pathname: propTypes.string.isRequired,
//   }),
//   component: propTypes.func.isRequired
// };

// PrivateRoute.defaultProps = {
//   location: {
//     pathname: '/'
//   }
// };
