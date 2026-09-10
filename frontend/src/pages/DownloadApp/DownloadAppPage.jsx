import React from 'react';
import { Link } from 'react-router-dom';

const DownloadAppPage = () => {
  return (
    <div className="w-full bg-background min-h-screen py-space-2xl px-margin-mobile lg:px-margin-desktop">
      <div className="max-w-[1280px] mx-auto space-y-space-3xl">
        
        {/* Hero Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-2xl items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-secondary">
              <span className="material-symbols-outlined text-[18px]">phone_iphone</span>
              <span className="font-label-sm uppercase tracking-[0.25em] font-semibold">
                Mobile Sanctuary Companion
              </span>
            </div>
            
            <h1 className="font-display-lg text-display-lg-mobile lg:text-display-lg text-primary font-semibold tracking-tight leading-tight">
              Table Ordering, Pre-Brew Alarms &amp; Rewards.
            </h1>

            <p className="font-body-lg text-on-surface-variant max-w-xl leading-relaxed">
              Carry the warmth of Luna &amp; Latte in your pocket. Order ahead for twilight pickup, settle table tabs seamlessly, and watch your crescent loyalty beans multiply.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <div className="px-6 py-3.5 bg-primary text-on-primary rounded-2xl flex items-center gap-3 shadow-md hover:bg-secondary transition-colors cursor-pointer">
                <span className="material-symbols-outlined text-[28px]">apple</span>
                <div className="text-left">
                  <p className="text-[10px] uppercase tracking-wider text-outline-variant">Download on the</p>
                  <p className="text-[15px] font-bold leading-none">Apple App Store</p>
                </div>
              </div>

              <div className="px-6 py-3.5 bg-primary text-on-primary rounded-2xl flex items-center gap-3 shadow-md hover:bg-secondary transition-colors cursor-pointer">
                <span className="material-symbols-outlined text-[28px]">android</span>
                <div className="text-left">
                  <p className="text-[10px] uppercase tracking-wider text-outline-variant">Get it on</p>
                  <p className="text-[15px] font-bold leading-none">Google Play</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            {/* Visual Phone Mockup */}
            <div className="relative w-72 h-[520px] bg-primary rounded-[48px] p-3 shadow-2xl border-4 border-surface-container-high/60">
              <div className="w-full h-full bg-surface rounded-[40px] overflow-hidden p-6 flex flex-col justify-between border border-surface-container">
                <div className="text-center pt-4">
                  <span className="text-[11px] uppercase tracking-widest text-secondary font-bold">Good Evening, Maya</span>
                  <h3 className="font-headline-sm text-primary font-bold mt-1">Crescent Patron</h3>
                  <div className="mt-4 p-4 bg-surface-container-low rounded-2xl border border-surface-container text-left space-y-1">
                    <p className="text-[11px] text-outline">Stored Balance</p>
                    <p className="text-[20px] font-bold text-primary">₹2,160.00</p>
                    <p className="text-[12px] text-secondary font-semibold">450 Nocturne Beans</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Link
                    to="/menu"
                    className="w-full py-3 bg-primary text-on-primary rounded-xl font-label-md text-center block font-semibold text-[13px]"
                  >
                    Quick Re-Order Latte
                  </Link>
                  <div className="text-center text-[11px] text-outline">
                    Table 12 Connected
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          <div className="p-6 bg-surface-container-low rounded-2xl border border-surface-container space-y-3">
            <span className="material-symbols-outlined text-secondary text-[32px]">qr_code_scanner</span>
            <h3 className="font-headline-sm text-headline-sm font-semibold text-primary">Contactless Table Ordering</h3>
            <p className="text-body-sm text-on-surface-variant leading-relaxed">
              Sit at any booth, scan the table disc, and order freshly pulled ristretto without having to wait in line.
            </p>
          </div>

          <div className="p-6 bg-surface-container-low rounded-2xl border border-surface-container space-y-3">
            <span className="material-symbols-outlined text-secondary text-[32px]">alarm</span>
            <h3 className="font-headline-sm text-headline-sm font-semibold text-primary">Pre-Brew Pickup Alarms</h3>
            <p className="text-body-sm text-on-surface-variant leading-relaxed">
              Schedule your hot cappuccino for the exact minute you arrive at the roastery doorstep.
            </p>
          </div>

          <div className="p-6 bg-surface-container-low rounded-2xl border border-surface-container space-y-3">
            <span className="material-symbols-outlined text-secondary text-[32px]">stars</span>
            <h3 className="font-headline-sm text-headline-sm font-semibold text-primary">Crescent Tier Perks</h3>
            <p className="text-body-sm text-on-surface-variant leading-relaxed">
              Unlock secret single-origin harvest micro-lots and complimentary sweet delicacies as your points grow.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadAppPage;
