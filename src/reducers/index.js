import { combineReducers } from 'redux';
import auth from './authReducers';
import devices from './deviceReducers';
import series from './seriesReducers';
import patients from './patientReducers';
import bagTypes from './bagTypesReducers';

export default combineReducers({
  auth,
  devices,
  series,
  patients,
  bagTypes
});
