import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { authenticateUser } from '../../../../actions/authActions';
import useSubmitForm from '../../../components/useSubmitForm';

function LoginForm(props) {
  const { handleChange, handleSubmit } = useSubmitForm();
  const { authUser } = props;

  return (
    <form onSubmit={(e) => handleSubmit(e, authUser)}>
      <div className="login__form--input">
        <label htmlFor="username">
          Username: 
        </label>
        <input 
          id="username" 
          type="text"
          onChange={handleChange}
        />
      </div>
      <div className="login__form--input">
        <label htmlFor="password">
          Password:
        </label>        
        <input 
          id="password" 
          type="password"
          onChange={handleChange}
        />
      </div>
      <input type="submit" className="login__submit" />
    </form>
  );
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
