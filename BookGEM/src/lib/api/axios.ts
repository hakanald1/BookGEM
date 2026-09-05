import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://bookgem-api.donaldchimaobijunior.workers.dev';

export interface AuthData {
  token: string | null;
  userId: string | null;
}

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

let authDataGetter: (() => Promise<AuthData>) | null = null;

export const setAuthTokenGetter = (getter: () => Promise<AuthData>) => {
  authDataGetter = getter;
};

apiClient.interceptors.request.use(async (config) => {
  if (authDataGetter) {
    try {
      const { token, userId } = await authDataGetter();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      if (userId) {
        config.headers['X-User-Id'] = userId;
      }
    } catch (err) {
      console.warn('Failed to retrieve auth credentials for request', err);
    }
  }

  const apiKey = import.meta.env.VITE_API_KEY;
  if (apiKey) {
    config.headers['X-API-Key'] = apiKey;
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});
