import {
  API_START, 
  API_END, 
  SET_BEARER_TOKEN, 
  LOGIN, 
  SET_AUTH_STATUS, 
  VERIFY_USER_TOKEN_FROM_LOCAL_STORAGE 
 } from '../actions/types';
 
 function authReducers(state = [], action) {
  console.log('action type => ', action.type);
  switch (action.type) {
    case SET_BEARER_TOKEN:
      console.log(action.payload);
      return { 
        isLoggedIn: true,
        token: action.payload.token,
        user: {
          username: action.payload.username,
          name: action.payload.name,
          surname: action.payload.surname,
          email: action.payload.email,
        }
      };
    case SET_AUTH_STATUS:
      console.log('AUTH_USER ...');
      console.log(action.payload);
      return {
        isLoggedIn: action.payload,
      };
    case API_START:
      console.log('API_START', action.payload);
      if (action.payload === LOGIN || action.payload === VERIFY_USER_TOKEN_FROM_LOCAL_STORAGE) {
        return {
          ...state,
        };
      }
      break;
    case API_END:
      console.log('API_END', action.payload);
      if (action.payload === LOGIN || action.payload === VERIFY_USER_TOKEN_FROM_LOCAL_STORAGE) {
          return {
          ...state,
        };
      }
      break;
    default:
      return state;
  }
}

export default authReducers;
