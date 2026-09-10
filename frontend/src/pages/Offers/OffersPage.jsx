import React, { useState, useEffect } from 'react';
import { offerService } from '../../services/offerService';

const OffersPage = () => {
  const [offers, setOffers] = useState([]);
  const [copiedCode, setCopiedCode] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const data = await offerService.getOffers();
        setOffers(data || []);
      } catch (err) {
        console.error('Error fetching offers', err);
      } finally {
        setLoading(false);
      }
    };
    fetchOffers();
  }, []);

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <div className="w-full bg-background min-h-screen py-space-2xl px-margin-mobile lg:px-margin-desktop">
      <div className="max-w-[1280px] mx-auto space-y-space-2xl">
        
        {/* Editorial Introduction */}
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 text-secondary mb-2">
            <span className="material-symbols-outlined text-[18px]">redeem</span>
            <span className="font-label-sm uppercase tracking-[0.25em] font-semibold">
              Privileges &amp; Codes
            </span>
          </div>
          <h1 className="font-display-lg text-display-lg-mobile lg:text-display-lg text-primary font-semibold tracking-tight">
            Something Special for You
          </h1>
          <p className="font-body-lg text-on-surface-variant mt-2 leading-relaxed">
            Exclusive privileges, seasonal tasting vouchers, and crescent rewards tailored for our devoted patrons and late-hour guests.
          </p>
        </div>

        {/* Offers Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-64 bg-surface-container rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {offers.map((offer) => (
              <div
                key={offer.id}
                className="bg-surface-container-low rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all border border-surface-container flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[11px] font-bold uppercase tracking-wider">
                      {offer.tierRequired === 'ALL' ? 'Open to All' : offer.tierRequired.replace('_', ' ')}
                    </span>
                    <span className="material-symbols-outlined text-secondary text-[24px]">local_activity</span>
                  </div>

                  <h3 className="font-title-md text-[18px] font-bold text-primary">{offer.title}</h3>
                  <p className="text-body-sm text-on-surface-variant leading-relaxed">{offer.description}</p>
                  
                  {offer.terms && (
                    <p className="text-[12px] text-outline italic border-t border-surface-container pt-2">
                      * {offer.terms}
                    </p>
                  )}
                </div>

                <div className="pt-6">
                  <div className="p-3 bg-surface-container rounded-xl flex items-center justify-between border border-outline-variant/40">
                    <span className="font-mono text-[16px] font-bold text-primary tracking-wider">
                      {offer.promoCode}
                    </span>
                    <button
                      onClick={() => handleCopy(offer.promoCode)}
                      className="px-3 py-1.5 rounded-lg bg-primary text-on-primary text-[12px] font-semibold hover:bg-secondary transition-colors"
                    >
                      {copiedCode === offer.promoCode ? 'Copied ✓' : 'Copy Code'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Guidance Banner */}
        <div className="p-8 rounded-2xl bg-surface-container border border-surface-container-high/60 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="font-headline-sm text-headline-sm font-semibold text-primary">Crescent Connoisseur Membership</h4>
            <p className="text-body-sm text-on-surface-variant max-w-xl">
              Every handcrafted espresso or wood-fired brunch accumulates Nocturne points automatically in your account profile.
            </p>
          </div>
          <a
            href="/menu"
            className="px-6 py-3 rounded-full bg-secondary text-on-secondary font-label-md font-semibold hover:bg-secondary/90 transition-all shrink-0"
          >
            Order &amp; Earn Perks
          </a>
        </div>
      </div>
    </div>
  );
};

export default OffersPage;
