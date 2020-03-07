import {
  SET_BAG_TYPES,
 } from '../actions/types';
 
 function bagTypesReducers(state = [], action) {
  console.log('action type => ', action.type);
  switch (action.type) {
    case SET_BAG_TYPES:
      console.log('SET_BAG_TYPES', action.payload);
      return action.payload;
    default:
      return state;
  }
}

export default bagTypesReducers;
