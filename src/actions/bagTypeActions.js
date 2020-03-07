import {
  SET_BAG_TYPES,
  FETCH_BAG_TYPES
} from './types';
import apiAction from './apiAction';
import store from '../store';

function getAccessToken() {
  const { auth } = store.getState();
  return auth.token;
}

function setBagTypes(data) {
  return {
    type: SET_BAG_TYPES,
    payload: data,
  };
}
export function fetchBagTypes() {
  const token = getAccessToken();
  return apiAction({
    url: 'http://localhost:1200/bagTypes',
    method: 'GET',
    token,
    onSuccess: setBagTypes,
    onFailure: () => console.log('Cannot get bag types'),
    label: FETCH_BAG_TYPES
  });
 }
