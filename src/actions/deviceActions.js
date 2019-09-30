import {
 FETCH_DEVICES, 
 SET_DEVICES,
 UPDATE_SINGLE_DEVICE,
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

function updateSignleDevice(data) {
  return {
    type: UPDATE_SINGLE_DEVICE,
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

export function updateDeviceData(newDeviceData) {
  const token = getAccessToken();
  return apiAction({
    url: 'http://localhost:1200/devices',
    method: 'PUT',
    data: newDeviceData,
    token,
    onSuccess: updateSignleDevice,
    onFailure: () => console.log('Cannot update device'),
    label: UPDATE_SINGLE_DEVICE
  });
}

export function xD() {
  return null;
}
