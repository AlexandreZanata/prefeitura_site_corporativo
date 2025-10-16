import http, { tokenStorage } from './http';

const AUTH_PREFIX = '/auth';

export const authService = {
  async login({ credential, password, remember }) {
    const { data } = await http.post(`${AUTH_PREFIX}/login`, {
      credential,
      password
    });
    if (data && data.access_token) {
      tokenStorage.set(data.access_token, !!remember);
    }
    return data;
  },

  // Placeholder endpoint: adjust to your backend when available
  async requestPasswordReset({ credential }) {
    const { data } = await http.post(`${AUTH_PREFIX}/forgot-password`, { credential });
    return data;
  },

  // Placeholder endpoint: adjust to your backend when available
  async register(payload) {
    const { data } = await http.post(`${AUTH_PREFIX}/register`, payload);
    return data;
  },

  async me() {
    const { data } = await http.get(`${AUTH_PREFIX}/me`);
    return data;
  },

  async logout() {
    try {
      await http.post(`${AUTH_PREFIX}/logout`);
    } finally {
      tokenStorage.clear();
    }
  },

  getToken() {
    return tokenStorage.get();
  }
};
