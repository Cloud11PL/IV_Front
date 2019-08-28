import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';
import apiMiddleware from '../middleware/api';

const initialState = {
  auth: {
    isLoggedIn: false,
  }
};

const store = createStore(
  rootReducer, 
  initialState,
  compose(
    applyMiddleware(apiMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
window.store = store;
export default store;
