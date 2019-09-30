import {
  FETCH_DEVICE_SERIES, SET_DEVICE_SERIES, UPDATE_SINGLE_SERIES
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

function updateSeries(data) {
  console.log('RETURNED DATA =>', data);
  return {
    type: UPDATE_SINGLE_SERIES,
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

export function updateSingleSeries(seriesData) {
  console.log('SERIES DATA => ', seriesData);
  const token = getAccessToken();
  return apiAction({
    url: 'http://localhost:1200/singleSeries',
    method: 'PUT',
    data: seriesData,
    accessToken: token,
    onSuccess: updateSeries,
    onFailure: () => console.log('Cannot get devices'),
    label: FETCH_DEVICE_SERIES
  });
}

export function xD() {
  return null;
}
