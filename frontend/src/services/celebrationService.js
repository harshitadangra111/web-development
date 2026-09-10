import apiClient from './apiClient';
import { ENDPOINTS } from '../constants/apiEndpoints';

export const celebrationService = {
  async bookCelebration(bookingData) {
    const response = await apiClient.post(ENDPOINTS.CELEBRATIONS, bookingData);
    return response.data.data;
  },

  async getMyCelebrations(email) {
    const response = await apiClient.get(ENDPOINTS.MY_CELEBRATIONS, { params: { email } });
    return response.data.data;
  },
};
