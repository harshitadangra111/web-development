import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { contactService } from '../../services/contactService';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await contactService.subscribeNewsletter(email);
      setSubscribed(true);
      setEmail('');
    } catch (err) {
      console.error('Subscription error', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="w-full bg-surface-container-highest border-t border-outline-variant/30 text-on-surface-variant pt-space-3xl pb-space-2xl">
      <div className="max-w-[1280px] mx-auto px-margin-mobile lg:px-margin-desktop grid grid-cols-1 md:grid-cols-12 gap-space-2xl">
        
        {/* Brand Column */}
        <div className="md:col-span-4 flex flex-col items-start gap-space-sm">
          <div className="flex items-center gap-space-sm">
            <img
              alt="Luna and Latte Logo"
              className="h-8 w-auto object-contain"
              src="https://lh3.googleusercontent.com/aida/AEtjO1WayUfJ8-nbhFfzaoQsMDcJxizdKSvKdlSb61UrKSaehmhkaEl4stxiKWTVo5EBcX_scKwlGjERM1damzXwFP7JIAwWp3q3uNU3I_T69T7zAzAMIUoM1EKly8Z99Qb2mGHLD5yObQBaHJvp9-waL298Qpt0kvhlbKSe6_rmt-eY-XGKqO1euf3aJJ9FWxdIvEzKAEUmR4A8ly6M4W544upHn69SGmlKtd_2tr8HXJWMODNAjzxidJBOmYBl"
            />
            <div className="flex flex-col">
              <span className="font-headline-sm text-[20px] tracking-tight text-primary font-bold leading-none">
                LUNA &amp; LATTE
              </span>
              <span className="font-label-sm text-[10px] tracking-[0.2em] text-secondary uppercase leading-tight mt-1">
                Nocturne Roastery
              </span>
            </div>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant max-w-sm mt-space-xs leading-relaxed">
            Where twilight slows the tempo of the world. Artisanal single-origin brews, delicate moon foam lattes, and peaceful sanctuaries designed for slow contemplation.
          </p>
          <div className="flex items-center gap-space-sm mt-space-xs text-primary">
            <span className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center hover:bg-secondary hover:text-on-secondary cursor-pointer transition-all">
              <span className="material-symbols-outlined text-[18px]">public</span>
            </span>
            <span className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center hover:bg-secondary hover:text-on-secondary cursor-pointer transition-all">
              <span className="material-symbols-outlined text-[18px]">share</span>
            </span>
            <span className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center hover:bg-secondary hover:text-on-secondary cursor-pointer transition-all">
              <span className="material-symbols-outlined text-[18px]">favorite</span>
            </span>
          </div>
        </div>

        {/* Quick Links */}
        <div className="md:col-span-2 flex flex-col gap-space-xs">
          <p className="font-label-md text-label-md text-primary uppercase font-bold tracking-wider mb-space-2xs">
            Sanctuary
          </p>
          <Link to="/menu" className="font-body-sm text-body-sm hover:text-primary transition-colors">Our Menu</Link>
          <Link to="/stores" className="font-body-sm text-body-sm hover:text-primary transition-colors">Find a Store</Link>
          <Link to="/birthday" className="font-body-sm text-body-sm hover:text-primary transition-colors">Private Events</Link>
          <Link to="/gift-cards" className="font-body-sm text-body-sm hover:text-primary transition-colors">Gift Cards</Link>
          <Link to="/offers" className="font-body-sm text-body-sm hover:text-primary transition-colors">Patron Perks</Link>
        </div>

        {/* Essays & Contact */}
        <div className="md:col-span-2 flex flex-col gap-space-xs">
          <p className="font-label-md text-label-md text-primary uppercase font-bold tracking-wider mb-space-2xs">
            Reflections
          </p>
          <Link to="/blogs" className="font-body-sm text-body-sm hover:text-primary transition-colors">Nocturne Chronicles</Link>
          <Link to="/contact" className="font-body-sm text-body-sm hover:text-primary transition-colors">Contact Roasters</Link>
          <Link to="/download-app" className="font-body-sm text-body-sm hover:text-primary transition-colors">Mobile Companion</Link>
          <Link to="/orders" className="font-body-sm text-body-sm hover:text-primary transition-colors">Track Order</Link>
        </div>

        {/* Newsletter Subscription */}
        <div className="md:col-span-4 flex flex-col gap-space-xs">
          <p className="font-label-md text-label-md text-primary uppercase font-bold tracking-wider mb-space-2xs">
            The Nocturne Letters
          </p>
          <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
            Quiet monthly letters detailing new single-origin harvest lots, extraction methods, and midnight tasting gatherings.
          </p>
          {subscribed ? (
            <div className="p-3 bg-secondary-container/40 border border-secondary/30 rounded-lg text-secondary text-body-sm flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">verified</span>
              <span>Thank you for joining our quiet nocturnal circle.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex items-center gap-2 mt-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your sanctuary email..."
                required
                className="w-full bg-surface-container-low px-4 py-2.5 rounded-full text-body-sm text-primary placeholder:text-outline border border-outline-variant/60 focus:outline-none focus:border-secondary"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-5 py-2.5 rounded-full bg-primary text-on-primary font-label-sm text-label-sm uppercase tracking-wider font-semibold hover:bg-primary-container transition-all shrink-0"
              >
                {loading ? '...' : 'Join'}
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-margin-mobile lg:px-margin-desktop mt-space-2xl pt-space-lg border-t border-outline-variant/20 flex flex-col sm:flex-row items-center justify-between gap-space-sm text-[12px] text-outline">
        <p>© 2026 Luna &amp; Latte Artisanal Nocturne Roastery. All rights reserved.</p>
        <p className="flex items-center gap-4">
          <span>Single-Origin Certified</span>
          <span>•</span>
          <span>100% Specialty Arabica</span>
          <span>•</span>
          <span>Hand-Poured with Care</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
