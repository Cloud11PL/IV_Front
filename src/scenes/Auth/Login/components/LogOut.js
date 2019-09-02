import React from 'react';
import { useDispatch } from 'react-redux';
import propTypes from 'prop-types';
import { logOutUser } from '../../../../actions/authActions';


export default function LogOut(props) {
  const { history } = props;
  const dispatch = useDispatch();
  dispatch(logOutUser());
  history.push('/');
  return (
    <div>
      Logging out...
    </div>
  );
}

LogOut.propTypes = {
  history: propTypes.shape({
    push: propTypes.func.isRequired
  }).isRequired
};
