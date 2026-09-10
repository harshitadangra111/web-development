import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { itemCount, openDrawer } = useCart();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Our Menu', path: '/menu' },
    { name: 'Luna & Latte Stores', path: '/stores' },
    { name: 'Gift Cards', path: '/gift-cards' },
    { name: 'Offers', path: '/offers' },
    { name: 'Blogs', path: '/blogs' },
    { name: 'Contact Us', path: '/contact' },
    { name: 'Download App', path: '/download-app' },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-surface/85 backdrop-blur-xl shadow-[0_4px_20px_-2px_rgba(42,29,21,0.04)] border-b border-surface-container">
      <div className="h-20 max-w-[1280px] mx-auto px-margin-mobile lg:px-margin-desktop flex items-center justify-between gap-space-md">
        
        {/* Brand Logo & Title */}
        <div className="flex items-center gap-space-sm shrink-0">
          <Link to="/" className="flex items-center gap-space-sm">
            <img
              alt="Luna and Latte Logo"
              className="h-9 w-auto object-contain"
              src="https://lh3.googleusercontent.com/aida/AEtjO1WayUfJ8-nbhFfzaoQsMDcJxizdKSvKdlSb61UrKSaehmhkaEl4stxiKWTVo5EBcX_scKwlGjERM1damzXwFP7JIAwWp3q3uNU3I_T69T7zAzAMIUoM1EKly8Z99Qb2mGHLD5yObQBaHJvp9-waL298Qpt0kvhlbKSe6_rmt-eY-XGKqO1euf3aJJ9FWxdIvEzKAEUmR4A8ly6M4W544upHn69SGmlKtd_2tr8HXJWMODNAjzxidJBOmYBl"
            />
            <div className="flex flex-col">
              <span className="font-headline-sm text-headline-sm tracking-tight text-primary font-semibold leading-none">
                LUNA &amp; LATTE
              </span>
              <span className="font-label-sm text-label-sm tracking-[0.2em] text-secondary uppercase leading-tight mt-space-3xs">
                Nocturne Roastery
              </span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-space-2xs bg-surface-container-low px-space-xs py-space-3xs rounded-full shadow-[0_2px_8px_-1px_rgba(42,29,21,0.03)] border border-surface-container-high/40">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `px-space-sm py-space-xs rounded-full font-label-md text-label-md transition-all ${
                  isActive
                    ? 'bg-primary-container text-on-primary shadow-sm font-semibold'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container/50'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* Right Actions: Perks, Cart Tray, Profile */}
        <div className="flex items-center gap-space-xs sm:gap-space-sm shrink-0">
          {/* Perks Button */}
          <Link
            to="/offers"
            aria-label="Special Seasonal Offers"
            className="hidden sm:flex items-center gap-space-3xs px-space-sm py-space-xs rounded-full bg-secondary-container text-on-secondary-container hover:bg-secondary hover:text-on-secondary transition-all shadow-sm"
          >
            <span className="material-symbols-outlined text-[18px]">redeem</span>
            <span className="font-label-sm text-label-sm uppercase font-bold tracking-wider">Perks</span>
          </Link>

          {/* View Order Tray Button with Dynamic Badge */}
          <button
            onClick={openDrawer}
            aria-label="View Order Tray"
            className="relative w-10 h-10 rounded-full flex items-center justify-center bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors border border-surface-container-high"
          >
            <span className="material-symbols-outlined text-[20px]">local_mall</span>
            {itemCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-secondary text-on-secondary font-label-sm text-[10px] leading-none flex items-center justify-center font-bold animate-pulse">
                {itemCount}
              </span>
            )}
          </button>

          {/* User Auth Avatar / Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                if (!isAuthenticated) {
                  navigate('/login');
                } else {
                  setUserMenuOpen(!userMenuOpen);
                }
              }}
              className="relative flex items-center pl-space-2xs focus:outline-none"
              title={isAuthenticated ? user?.fullName : 'Sign in to Luna & Latte'}
            >
              <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center ring-2 ring-secondary-container/40 text-on-primary shadow-sm hover:ring-secondary transition-all">
                <span className="material-symbols-outlined text-[19px]">person</span>
              </div>
              <span className="absolute -bottom-1 -right-0.5 flex items-center justify-center w-4 h-4 bg-primary-container rounded-full text-secondary-fixed text-[9px] select-none border border-surface">
                <span className="material-symbols-outlined text-[10px] leading-none text-secondary-fixed">
                  dark_mode
                </span>
              </span>
            </button>

            {/* Profile Menu Dropdown */}
            {userMenuOpen && isAuthenticated && (
              <div className="absolute right-0 mt-2 w-64 bg-surface-container-lowest rounded-xl shadow-xl border border-surface-container py-2 z-50">
                <div className="px-4 py-3 border-b border-surface-container">
                  <p className="font-label-md font-semibold text-primary">{user?.fullName}</p>
                  <p className="text-body-sm text-on-surface-variant truncate">{user?.email}</p>
                  <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed text-label-sm font-semibold">
                    <span className="material-symbols-outlined text-[14px]">stars</span>
                    <span>{user?.patronTier?.replace('_', ' ')}</span>
                  </div>
                  <p className="text-[12px] text-secondary mt-1 font-medium">
                    {user?.rewardPoints || 0} Nocturne Beans accrued
                  </p>
                </div>
                <Link
                  to="/orders"
                  onClick={() => setUserMenuOpen(false)}
                  className="flex items-center gap-2 px-4 py-2.5 text-body-sm text-on-surface hover:bg-surface-container transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">receipt_long</span>
                  My Orders
                </Link>
                <Link
                  to="/birthday"
                  onClick={() => setUserMenuOpen(false)}
                  className="flex items-center gap-2 px-4 py-2.5 text-body-sm text-on-surface hover:bg-surface-container transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">celebration</span>
                  Celebrations &amp; Events
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setUserMenuOpen(false);
                  }}
                  className="w-full text-left flex items-center gap-2 px-4 py-2.5 text-body-sm text-error hover:bg-error-container/20 transition-colors border-t border-surface-container mt-1"
                >
                  <span className="material-symbols-outlined text-[18px]">logout</span>
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
