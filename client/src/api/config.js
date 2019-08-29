import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://18.136.204.174',
});

export default axiosInstance;
