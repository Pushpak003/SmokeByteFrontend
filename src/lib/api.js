// src/api/api.js

import axios from 'axios';

// Backend ka base URL. Agar aapka port alag hai (e.g., 3000), to use yahan change karein.
const API_URL = 'https://smokebyte-backend-latest.onrender.com'; 

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Cookies (refresh token) ko bhejne ke liye zaroori hai
});

// Request Interceptor: Har request bhejne se pehle ye function chalega
api.interceptors.request.use(
  (config) => {
    // localStorage se accessToken nikalo
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      // Agar token hai, to usko Authorization header me set karo
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


// Response Interceptor: Jab bhi backend se response aayega, ye function chalega
api.interceptors.response.use(
  // Agar response theek hai (status 2xx), to response ko aage bhej do
  (response) => response,
  
  // Agar response me error hai
  async (error) => {
    const originalRequest = error.config;

    // Agar error 401 (Unauthorized) hai aur ye request dobara try nahi hui hai
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Request ko mark karo taki infinite loop na bane

      try {
        // Refresh token endpoint ko call karke naya access token lo
        const response = await axios.post(`${API_URL}/auth/refresh-token`, {}, { withCredentials: true });
        
        const { accessToken } = response.data;

        // Naye access token ko localStorage me save karo
        localStorage.setItem('accessToken', accessToken);

        // Original request ke header me naya token set karo
        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
        
        // Ab original request ko naye token ke saath dobara bhejo
        return api(originalRequest);

      } catch (refreshError) {
        // Agar refresh token bhi fail ho jaye, to user ko logout kar dena chahiye
        console.error("Session expired. Please login again.", refreshError);
        // Yahan aap user ko logout karne ka logic likh sakte hain
        // (e.g., localStorage clear karke login page pe bhej do)
        localStorage.removeItem('accessToken');
        window.location.href = '/login'; // Redirect to login page
        return Promise.reject(refreshError);
      }
    }

    // Agar error 401 nahi hai, to error ko aage pass kar do
    return Promise.reject(error);
  }
);

export default api;