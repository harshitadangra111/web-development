import apiClient from './apiClient';
import { ENDPOINTS } from '../constants/apiEndpoints';

export const menuService = {
  async getCategories() {
    const response = await apiClient.get(ENDPOINTS.CATEGORIES);
    return response.data.data;
  },

  async getMenuItems({ search, category, vegOnly, eggless } = {}) {
    const params = {};
    if (search) params.search = search;
    if (category && category !== 'All') params.category = category;
    if (vegOnly) params.vegOnly = true;
    if (eggless) params.eggless = true;

    const response = await apiClient.get(ENDPOINTS.MENU, { params });
    return response.data.data;
  },

  async getFeaturedItems() {
    const response = await apiClient.get(ENDPOINTS.FEATURED_MENU);
    return response.data.data;
  },

  async getMenuItemById(id) {
    const response = await apiClient.get(`${ENDPOINTS.MENU}/${id}`);
    return response.data.data;
  },
};
