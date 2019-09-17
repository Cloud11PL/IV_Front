import {
  FETCH_DEVICE_SERIES, SET_DEVICE_SERIES 
 } from './types';
 import apiAction from './apiAction';
 import store from '../store';

 function getAccessToken() {
  const { auth } = store.getState();
  return auth.token;
}


 function setDeviceSeries(data) {
  return {
    type: SET_DEVICE_SERIES,
    payload: data,
  };
}
export function fetchSeriesForDevice(deviceId) {
  console.log('DEVICE ID =>', deviceId);
  const token = getAccessToken();
  return apiAction({
    url: 'http://localhost:1200/deviceSeries',
    method: 'GET',
    data: {
      deviceId,
    },
    accessToken: token,
    onSuccess: setDeviceSeries,
    onFailure: () => console.log('Cannot get devices'),
    label: FETCH_DEVICE_SERIES
  });
}

export function xD() {
  return null;
}
