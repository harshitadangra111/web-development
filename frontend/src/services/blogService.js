import apiClient from './apiClient';
import { ENDPOINTS } from '../constants/apiEndpoints';

export const blogService = {
  async getAllPosts() {
    const response = await apiClient.get(ENDPOINTS.BLOGS);
    return response.data.data;
  },

  async getPostBySlug(slug) {
    const response = await apiClient.get(ENDPOINTS.BLOG_DETAIL(slug));
    return response.data.data;
  },
};
