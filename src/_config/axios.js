import * as axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

axios.interceptors.request.use(
  (config) => {
    if (!config.headers.Authorization) {
      const { token } = JSON.parse(localStorage.getItem('keyCloak'));

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);
