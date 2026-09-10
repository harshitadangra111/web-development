import apiClient from './apiClient';
import { ENDPOINTS } from '../constants/apiEndpoints';

export const orderService = {
  async createOrder(orderData) {
    const response = await apiClient.post(ENDPOINTS.ORDERS, orderData);
    return response.data.data;
  },

  async getOrderByNumber(orderNumber) {
    const response = await apiClient.get(`${ENDPOINTS.ORDERS}/${orderNumber}`);
    return response.data.data;
  },

  async getMyOrders() {
    const response = await apiClient.get(ENDPOINTS.MY_ORDERS);
    return response.data.data;
  },
};
