import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://server-hwdi.onrender.com', // Base API URL
  timeout: 10000, // Timeout in ms
});

// Add request interceptor for authorization headers
axiosInstance.interceptors.request.use((config) => {
  const user = localStorage.getItem('user');
  const token = user.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
export default axiosInstance;
