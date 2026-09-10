import apiClient from './apiClient';
import { ENDPOINTS } from '../constants/apiEndpoints';

export const offerService = {
  async getOffers() {
    const response = await apiClient.get(ENDPOINTS.OFFERS);
    return response.data.data;
  },

  async validatePromoCode(promoCode) {
    const response = await apiClient.get(ENDPOINTS.VALIDATE_OFFER(promoCode));
    return response.data.data;
  },
};
