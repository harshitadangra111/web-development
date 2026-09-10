import apiClient from './apiClient';
import { ENDPOINTS } from '../constants/apiEndpoints';

export const contactService = {
  async submitInquiry(inquiryData) {
    const response = await apiClient.post(ENDPOINTS.CONTACT, inquiryData);
    return response.data;
  },

  async subscribeNewsletter(email) {
    const response = await apiClient.post(ENDPOINTS.NEWSLETTER, { email });
    return response.data;
  },
};
