import apiClient from './apiClient';
import { ENDPOINTS } from '../constants/apiEndpoints';

export const giftCardService = {
  async purchaseGiftCard(purchaseData) {
    const response = await apiClient.post(ENDPOINTS.GIFT_CARDS_PURCHASE, purchaseData);
    return response.data.data;
  },

  async checkBalance(cardNumber, pin) {
    const response = await apiClient.post(ENDPOINTS.GIFT_CARDS_CHECK, { cardNumber, pin });
    return response.data.data;
  },
};
