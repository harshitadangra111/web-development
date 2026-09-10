import apiClient from './apiClient';
import { ENDPOINTS } from '../constants/apiEndpoints';

export const storeService = {
  async getAllStores(search) {
    const params = search ? { search } : {};
    const response = await apiClient.get(ENDPOINTS.STORES, { params });
    return response.data.data;
  },

  async getStoreById(id) {
    const response = await apiClient.get(`${ENDPOINTS.STORES}/${id}`);
    return response.data.data;
  },
};
