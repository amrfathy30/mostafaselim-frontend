import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://api.mustafaselim.net/api', 
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

export default axiosInstance;