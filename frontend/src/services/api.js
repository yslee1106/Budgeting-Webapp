import axios from 'axios';

let interceptorId;

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:8000/';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,  // Required for HttpOnly cookies
});

// Request interceptor (will be updated in Authentication Context)
export const configureApiInterceptor = (getToken, logout) => {
  // Eject previous interceptor if exists
  if (interceptorId !== undefined) {
    api.interceptors.request.eject(interceptorId);
  }
  interceptorId = api.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  // Response interceptor (handles token refresh)
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          // Refresh token using HttpOnly cookie
          const res = await axios.post(
            `${API_BASE_URL}user/token/refresh/`,
            {},
            { withCredentials: true }
          );
          const newAccessToken = res.data.access;
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        } catch (err) {
          // Clear state and redirect on refresh failure
          logout();
          window.location.href = '/login';
        }
      }
      return Promise.reject(error);
    }
  );
};

export default api;