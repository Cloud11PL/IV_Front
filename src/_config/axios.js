import axios from 'axios';

const defaultOptions = {
  baseUrl: process.env.REACT_APP_BASE_URL || '',
  headers: {
    'Content-Type': 'application/json',
  },
};

const instance = axios.create(defaultOptions);

instance.interceptors.request.use(
  (config) => {
    if (!config.headers.Authorization) {
      const { token } = JSON.parse(localStorage.getItem('user'));

      if (token) {
        // eslint-disable-next-line no-param-reassign
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
