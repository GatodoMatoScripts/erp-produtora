import axios, { type AxiosRequestConfig } from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // <-- MUDANÇA AQUI
});

api.interceptors.request.use((config: AxiosRequestConfig) => {
  const token = localStorage.getItem('erp_token');
  if (token) {
    if (!config.headers) {
      config.headers = {};
    }
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;