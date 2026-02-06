import axios from 'axios';
import { getAuthToken } from '../app/utils/getAuthToken';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || '/',
  // If you use HttpOnly cookies and server expects cookies, enable credentials:
  // withCredentials: true
});

// Attach Authorization header when token is readable in JS
api.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

export default api;