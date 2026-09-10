import apiClient from './apiClient';
import { ENDPOINTS } from '../constants/apiEndpoints';

export const reservationService = {
  async createReservation(reservationData) {
    const response = await apiClient.post(ENDPOINTS.RESERVATIONS, reservationData);
    return response.data.data;
  },

  async getMyReservations() {
    const response = await apiClient.get(ENDPOINTS.MY_RESERVATIONS);
    return response.data.data;
  },
};
