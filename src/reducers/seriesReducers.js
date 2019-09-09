import {
  SET_DEVICE_SERIES
 } from '../actions/types';
 
 function seriesReducers(state = [], action) {
  console.log('action type => ', action.type);
  switch (action.type) {
    case SET_DEVICE_SERIES: 
      console.log('SET_DEVICE_SERIES', action.payload);
      return action.payload;
    default:
      return state;
  }
}

export default seriesReducers;
