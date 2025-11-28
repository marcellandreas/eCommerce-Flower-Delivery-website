import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api', // Adjust based on your backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Attach Clerk Token
api.interceptors.request.use(
  async (config) => {
    try {
      // Access Clerk client from window object (injected by ClerkProvider)
      const token = await window.Clerk?.session?.getToken();

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error fetching Clerk token:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Global Error Handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle specific error codes if needed (e.g., 401 logout)
    if (error.response?.status === 401) {
      console.warn('Unauthorized access - redirecting to login...');
      // Optional: Trigger logout or redirect
    }
    return Promise.reject(error);
  }
);

export default api;