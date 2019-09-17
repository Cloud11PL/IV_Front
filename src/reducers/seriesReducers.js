import {
  SET_DEVICE_SERIES
 } from '../actions/types';
 
 function seriesReducers(state = {}, action) {
  console.log('action type => ', action.type);
  switch (action.type) {
    case SET_DEVICE_SERIES: 
      return { 
        ...state, 
        [action.payload[0].Device_Id]: {
          ...action.payload
        }
      };
    default:
      return state;
  }
}

export default seriesReducers;
