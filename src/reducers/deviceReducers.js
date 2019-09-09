import {
  SET_DEVICES,
 } from '../actions/types';
 
 function deviceReducers(state = [], action) {
  console.log('action type => ', action.type);
  switch (action.type) {
    case SET_DEVICES:
      console.log('SET_DEVICES', action.payload);
      return action.payload;
    default:
      return state;
  }
}

export default deviceReducers;
