import { combineReducers } from 'redux';
import auth from './authReducers';
import devices from './deviceReducers';
import series from './seriesReducers';

export default combineReducers({
  auth,
  devices,
  series
});
