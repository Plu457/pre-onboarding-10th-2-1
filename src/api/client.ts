import axios, { AxiosRequestConfig } from 'axios';

export const client = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

const setAuthToken = (config: AxiosRequestConfig) => {
  const token = localStorage.getItem('token');
  if (token) {
    if (!config.headers) {
      config.headers = {};
    }
    config.headers['Authorization'] = `Bearer ${token}`;
  }
};

client.interceptors.request.use(
  (config) => {
    setAuthToken(config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
