import { SET_PATIENTS, FETCH_PATIENTS } from './types';
import apiAction from './apiAction';
import store from '../store';

function getAccessToken() {
  const { auth } = store.getState();
  return auth.token;
}

function setPatients(data) {
  return {
    type: SET_PATIENTS,
    payload: data,
  };
}
// eslint-disable-next-line import/prefer-default-export
export function fetchPatients() {
  const token = getAccessToken();
  return apiAction({
    url: 'http://localhost:1200/patients',
    method: 'GET',
    token,
    onSuccess: setPatients,
    onFailure: () => console.log('Cannot get devices'),
    label: FETCH_PATIENTS
  });
}
