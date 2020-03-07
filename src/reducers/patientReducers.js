import {
  SET_PATIENTS,
 } from '../actions/types';
 
 function patientReducers(state = [], action) {
  console.log('action type => ', action.type);
  switch (action.type) {
    case SET_PATIENTS:
      console.log('SET_PATIENTS', action.payload);
      return action.payload;
    // case UPDATE_SINGLE_DEVICE:
    //   console.log('UPDATE_SINGLE_DEVICE', action.payload);
    //   return state.map((device, index) => {
    //     if (device._id === action.payload._id) {
    //       return {
    //         ...device,
    //         Device_Name: action.payload.Device_Name,
    //         Location: action.payload.Location,
    //       };
    //     }

    //     return device;
    //   });
    default:
      return state;
  }
}

export default patientReducers;
