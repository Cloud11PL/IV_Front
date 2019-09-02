import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { authenticateUser } from '../../../../actions/authActions';
import useSubmitForm from '../../../components/useSubmitForm';

function LoginForm(props) {
  // const [inputs, setInputs] = useState({});

  // const sendData = () => {
  //   const { authUser } = props;
  //   authUser(inputs);
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   sendData();
  // };


  // const handleChange = (e) => {
  //   e.persist();
  //   setInputs((data) => ({ ...data, [e.target.id]: e.target.value }));
  // };
  const { handleChange, handleSubmit } = useSubmitForm();
  const { authUser } = props;

  return (
    <form onSubmit={(e) => handleSubmit(e, authUser)}>
      <label htmlFor="username">
        Username: 
        <input 
          id="username" 
          type="text"
          onChange={handleChange}
        />
      </label>
      <label htmlFor="password">
        Password:
        <input 
          id="password" 
          type="password"
          onChange={handleChange}
        />
      </label>
      <input type="submit" />
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
