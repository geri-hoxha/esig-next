import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://api.dev.esig.al/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});




export const getTokenFromLocalStorage = () => localStorage.getItem('token');


// Add a request interceptor
axiosInstance.interceptors.request.use(
    function (config) {
      // Do something before request is sent
      // For example, adding an authentication token to every request
       config.headers.Authorization = `Bearer ${getTokenFromLocalStorage()}`;
  
      return config;
    }, function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

export default axiosInstance;