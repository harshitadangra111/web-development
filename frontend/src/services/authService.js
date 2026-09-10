import apiClient from './apiClient';
import { ENDPOINTS } from '../constants/apiEndpoints';

export const authService = {
  async login(credentials) {
    const response = await apiClient.post(ENDPOINTS.LOGIN, credentials);
    return response.data.data;
  },

  async register(userData) {
    const response = await apiClient.post(ENDPOINTS.REGISTER, userData);
    return response.data.data;
  },

  async getCurrentUser() {
    const response = await apiClient.get(ENDPOINTS.ME);
    return response.data.data;
  },
};
