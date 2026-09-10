import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import HomePage from '../pages/Home/HomePage';
import MenuPage from '../pages/Menu/MenuPage';
import StoresPage from '../pages/Stores/StoresPage';
import OffersPage from '../pages/Offers/OffersPage';
import GiftCardsPage from '../pages/GiftCards/GiftCardsPage';
import BirthdayPage from '../pages/Birthday/BirthdayPage';
import BlogsPage from '../pages/Blogs/BlogsPage';
import ContactPage from '../pages/Contact/ContactPage';
import DownloadAppPage from '../pages/DownloadApp/DownloadAppPage';
import LoginPage from '../pages/Auth/LoginPage';
import RegisterPage from '../pages/Auth/RegisterPage';
import OrdersPage from '../pages/Orders/OrdersPage';
import ProtectedRoute from './ProtectedRoute';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Stitch Screens */}
      <Route path="/" element={<HomePage />} />
      <Route path="/home" element={<Navigate to="/" replace />} />
      <Route path="/our-menu" element={<Navigate to="/menu" replace />} />
      <Route path="/menu" element={<MenuPage />} />
      <Route path="/luna-and-latte-stores" element={<Navigate to="/stores" replace />} />
      <Route path="/stores" element={<StoresPage />} />
      <Route path="/gift-cards" element={<GiftCardsPage />} />
      <Route path="/offers" element={<OffersPage />} />
      <Route path="/birthday" element={<BirthdayPage />} />
      <Route path="/blogs" element={<BlogsPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/contact-us" element={<Navigate to="/contact" replace />} />
      <Route path="/download-app" element={<DownloadAppPage />} />

      {/* Auth */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/orders" element={<OrdersPage />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
