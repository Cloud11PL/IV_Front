import {
 LOGIN, 
 SET_BEARER_TOKEN, 
 VERIFY_USER_TOKEN_FROM_LOCAL_STORAGE, 
 SET_AUTH_STATUS,
} from './types';
import apiAction from './apiAction';

function userAuthorized(data) {
  if (data.isAuthorized === true) {
    const user = JSON.parse(localStorage.getItem('user'));
    return {
      type: SET_BEARER_TOKEN,
      payload: user,
    };
  } 
}

function clearLocalStorage() {
  localStorage.clear();
  return {
    type: SET_AUTH_STATUS,
    payload: false
  };
}

function saveUserInLocalStorage(data) {
  localStorage.setItem('user', JSON.stringify(data));
}

function setBearerToken(data) {
  saveUserInLocalStorage(data);
  return {
    type: SET_BEARER_TOKEN,
    payload: data
  };
}

export function logOutUser() {
  localStorage.clear();
  return {
    type: SET_AUTH_STATUS,
    payload: false,
  };
}

export function authenticateUser(data) {
  return apiAction({
    url: 'http://localhost:1200/authenticate',
    method: 'POST',
    data,
    onSuccess: setBearerToken,
    onFailure: () => console.log('Cannot authenticate'),
    label: LOGIN
  });
}

export function authUser(token) {
  return apiAction({
    url: 'http://localhost:1200/authToken',
    method: 'POST',
    data: {
      token,
    },
    onSuccess: userAuthorized,
    onFailure: clearLocalStorage,
    label: VERIFY_USER_TOKEN_FROM_LOCAL_STORAGE
  });
}
