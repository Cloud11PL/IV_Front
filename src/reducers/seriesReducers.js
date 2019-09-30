import {
  SET_DEVICE_SERIES,
  UPDATE_SINGLE_SERIES
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
    case UPDATE_SINGLE_SERIES:
      // Iffy, somethings weird happening
      return state[action.payload.Device_Id].map((series) => {
          if (series.SeriesId === action.payload[0].SeriesId) {
            console.log(action.payload[0]);
            return action.payload[0];
          }
          return series;
        });
    default:
      return state;
  }
}

export default seriesReducers;
