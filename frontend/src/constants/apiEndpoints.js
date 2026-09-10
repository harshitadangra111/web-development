/**
 * Normalizes the API base URL configured via environment variables.
 * - Defaults to '/api' for local development to use the Vite proxy.
 * - Trims trailing slashes.
 * - If a full URL is provided (e.g. https://api.onrender.com) without the '/api' suffix,
 *   appends '/api' so requests match Spring Boot's @RequestMapping("/api/...") routes.
 */
export const normalizeApiBaseUrl = (rawUrl) => {
  const url = rawUrl || import.meta.env.VITE_API_BASE_URL || '/api';
  if (!url || typeof url !== 'string' || url.trim() === '') {
    return '/api';
  }
  const trimmed = url.trim().replace(/\/+$/, '');
  if (/^https?:\/\//i.test(trimmed)) {
    try {
      const parsed = new URL(trimmed);
      if (parsed.pathname === '' || parsed.pathname === '/') {
        return `${trimmed}/api`;
      }
      return trimmed;
    } catch {
      return trimmed.endsWith('/api') ? trimmed : `${trimmed}/api`;
    }
  }
  return trimmed;
};

export const API_BASE_URL = normalizeApiBaseUrl(import.meta.env.VITE_API_BASE_URL);

export const ENDPOINTS = {
  // Auth
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  ME: '/auth/me',

  // Menu & Categories
  CATEGORIES: '/categories',
  MENU: '/menu',
  FEATURED_MENU: '/menu/featured',

  // Stores & Reservations
  STORES: '/stores',
  RESERVATIONS: '/reservations',
  MY_RESERVATIONS: '/reservations/my',

  // Orders
  ORDERS: '/orders',
  MY_ORDERS: '/orders/my',

  // Offers
  OFFERS: '/offers',
  VALIDATE_OFFER: (code) => `/offers/validate/${code}`,

  // Gift Cards
  GIFT_CARDS_PURCHASE: '/giftcards/purchase',
  GIFT_CARDS_CHECK: '/giftcards/check-balance',

  // Celebrations
  CELEBRATIONS: '/celebrations',
  MY_CELEBRATIONS: '/celebrations/my',

  // Blogs & Chronicles
  BLOGS: '/blogs',
  BLOG_DETAIL: (slug) => `/blogs/${slug}`,

  // Contact & Newsletter
  CONTACT: '/contact',
  NEWSLETTER: '/newsletter/subscribe',
};
