import axios from 'axios';
import { API_BASE_URL, normalizeApiBaseUrl } from '../constants/apiEndpoints';

// Determine normalized base URL with local '/api' fallback
const resolvedBaseUrl = normalizeApiBaseUrl(import.meta.env.VITE_API_BASE_URL || '/api');

const apiClient = axios.create({
  baseURL: resolvedBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

// Request Interceptor: Attach JWT Bearer Token if present
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('luna_latte_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Catch 401 Unauthorized and redirect to /login
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear invalid credentials
      localStorage.removeItem('luna_latte_token');
      localStorage.removeItem('luna_latte_user');

      // Only redirect if not already on the login page
      if (window.location.pathname !== '/login' && window.location.pathname !== '/register') {
        window.location.href = '/login?expired=true';
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
