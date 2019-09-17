import {
 FETCH_DEVICES, SET_DEVICES
} from './types';
import apiAction from './apiAction';
import store from '../store';

function getAccessToken() {
  const { auth } = store.getState();
  return auth.token;
}

function setDevices(data) {
  return {
    type: SET_DEVICES,
    payload: data,
  };
}

export function fetchDevices() {
  const token = getAccessToken();
  return apiAction({
    url: 'http://localhost:1200/devices',
    method: 'GET',
    token,
    onSuccess: setDevices,
    onFailure: () => console.log('Cannot get devices'),
    label: FETCH_DEVICES
  });
}

export function xD() {
  return null;
}
