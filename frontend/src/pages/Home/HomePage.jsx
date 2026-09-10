import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { menuService } from '../../services/menuService';
import { useCart } from '../../context/CartContext';

const HomePage = () => {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [featuredItems, setFeaturedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [qrModalOpen, setQrModalOpen] = useState(false);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const items = await menuService.getFeaturedItems();
        setFeaturedItems(items.length > 0 ? items : []);
      } catch (err) {
        console.error('Error fetching featured items', err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <div className="w-full bg-background">
      {/* 1. ATMOSPHERIC NOCTURNE HERO SECTION */}
      <section className="relative w-full overflow-hidden bg-primary text-on-primary pt-12 pb-24 px-margin-mobile lg:px-margin-desktop border-b border-surface-container">
        {/* Ambient Warm Golden & Terracotta Glows */}
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-secondary/20 blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -right-48 w-[32rem] h-[32rem] rounded-full bg-tertiary-container/30 blur-3xl pointer-events-none" />

        <div className="max-w-[1280px] mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-2xl items-center">
            
            {/* Left Column: Atmospheric Editorial Intro */}
            <div className="lg:col-span-7 flex flex-col items-start gap-space-md">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container/10 border border-secondary/30 text-secondary-fixed">
                <span className="material-symbols-outlined text-[16px]">dark_mode</span>
                <span className="font-label-sm text-label-sm uppercase tracking-[0.2em] font-semibold">
                  Artisanal Nocturnal Roastery
                </span>
              </div>

              <h1 className="font-display-lg text-display-lg-mobile lg:text-display-lg text-on-primary tracking-tight font-semibold leading-[1.1]">
                Your Everyday Escape, <br />
                <span className="italic font-normal text-secondary-container">One Cup</span> at a Time.
              </h1>

              <p className="font-body-lg text-body-lg text-outline-variant max-w-xl leading-relaxed">
                Step away from the hurried rush into warm amber light, quiet velvet booths, and slowly roasted single-origin coffees designed to awaken the senses beneath twilight.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-space-sm pt-space-xs">
                <Link
                  to="/menu"
                  className="px-8 py-3.5 rounded-full bg-secondary-container text-on-secondary-container font-label-md text-label-md uppercase tracking-wider font-bold shadow-lg hover:bg-secondary hover:text-on-secondary transition-all flex items-center gap-2"
                >
                  <span>Explore Menu</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </Link>

                <button
                  onClick={() => setQrModalOpen(true)}
                  className="px-6 py-3.5 rounded-full bg-surface-container/15 text-surface-bright border border-outline/40 font-label-md text-label-md uppercase tracking-wider font-semibold hover:bg-surface-container/30 transition-all flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px] text-secondary-fixed">qr_code_scanner</span>
                  <span>Table Scan &amp; Order</span>
                </button>
              </div>

              {/* Social Proof Micro-Strip */}
              <div className="pt-space-md flex items-center gap-space-md">
                <div className="flex -space-x-2 overflow-hidden">
                  <div className="inline-block h-8 w-8 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container font-bold text-[11px] shadow-sm">
                    LN
                  </div>
                  <div className="inline-block h-8 w-8 rounded-full bg-primary-container flex items-center justify-center text-secondary-fixed font-bold text-[11px] shadow-sm">
                    MK
                  </div>
                  <div className="inline-block h-8 w-8 rounded-full bg-surface-container flex items-center justify-center text-primary font-bold text-[11px] shadow-sm">
                    SC
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1 text-secondary-container text-sm">
                    <span className="material-symbols-outlined text-[15px] material-symbols-fill">star</span>
                    <span className="material-symbols-outlined text-[15px] material-symbols-fill">star</span>
                    <span className="material-symbols-outlined text-[15px] material-symbols-fill">star</span>
                    <span className="material-symbols-outlined text-[15px] material-symbols-fill">star</span>
                    <span className="material-symbols-outlined text-[15px] material-symbols-fill">star</span>
                    <span className="font-label-md text-label-sm text-surface-bright ml-1">4.9 / 5</span>
                  </div>
                  <span className="font-body-sm text-[12px] text-outline-variant">
                    Over 24,000 quiet moments curated this month
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Floating Table QR Feature Card */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-sm">
                <div className="absolute -inset-2 bg-gradient-to-r from-secondary-container/20 to-secondary/30 rounded-2xl blur-xl opacity-70" />
                <div className="relative rounded-2xl bg-surface-container-low/95 backdrop-blur-xl p-space-lg shadow-2xl flex flex-col gap-space-md text-on-surface border border-surface-container-high/40">
                  <div className="flex items-center justify-between pb-space-xs">
                    <div className="flex items-center gap-space-xs">
                      <span className="material-symbols-outlined text-secondary text-[24px]">table_bar</span>
                      <span className="font-title-md text-title-md text-primary font-semibold">Scan. Order. Enjoy.</span>
                    </div>
                    <span className="px-space-xs py-space-3xs rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-bold uppercase tracking-wider">
                      Table 12 Active
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Seated at our sanctuary? Tap the QR emblem to seamlessly curate your tray without interrupting your conversation.
                  </p>

                  <div
                    onClick={() => navigate('/menu')}
                    className="relative w-full aspect-square max-w-[200px] mx-auto rounded-xl bg-surface p-space-sm flex flex-col items-center justify-center shadow-inner group cursor-pointer border border-surface-container"
                  >
                    <svg className="w-full h-full text-primary" fill="currentColor" viewBox="0 0 100 100">
                      <rect height="22" rx="3" width="22" x="10" y="10" />
                      <rect fill="#FDF9F3" height="14" width="14" x="14" y="14" />
                      <rect height="6" width="6" x="18" y="18" />
                      <rect height="22" rx="3" width="22" x="68" y="10" />
                      <rect fill="#FDF9F3" height="14" width="14" x="72" y="14" />
                      <rect height="6" width="6" x="76" y="18" />
                      <rect height="22" rx="3" width="22" x="10" y="68" />
                      <rect fill="#FDF9F3" height="14" width="14" x="14" y="72" />
                      <rect height="6" width="6" x="18" y="76" />
                      <circle cx="50" cy="50" fill="#825511" r="10" />
                      <path d="M46 50A4 4 0 0 1 54 46A4 4 0 1 0 46 50Z" fill="#FDF9F3" />
                      <rect height="6" width="6" x="40" y="15" />
                      <rect height="12" width="6" x="52" y="15" />
                      <rect height="6" width="18" x="40" y="27" />
                      <rect height="6" width="8" x="15" y="40" />
                      <rect height="18" width="6" x="27" y="40" />
                      <rect height="6" width="8" x="15" y="52" />
                      <rect height="6" width="18" x="68" y="40" />
                      <rect height="8" width="10" x="76" y="50" />
                      <rect height="14" width="6" x="68" y="62" />
                      <rect height="18" width="8" x="40" y="68" />
                      <rect height="10" width="12" x="52" y="76" />
                    </svg>
                    <div className="absolute inset-0 bg-primary/85 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex flex-col items-center justify-center text-on-primary p-2 text-center">
                      <span className="material-symbols-outlined text-[24px] text-secondary-container">touch_app</span>
                      <span className="font-label-md text-label-sm mt-1">Tap to Order at Table</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm pt-space-2xs">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-secondary-container animate-ping" />
                      Instant Contactless
                    </span>
                    <span className="font-semibold text-secondary">Pay at Table</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. 4 QUICK ACTION TILES */}
      <section className="max-w-[1280px] mx-auto px-margin-mobile lg:px-margin-desktop -mt-10 lg:-mt-12 relative z-20 w-full mb-space-3xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-space-sm lg:gap-space-md">
          {/* Action 1: Menu */}
          <Link
            to="/menu"
            className="group p-space-md lg:p-space-lg rounded-xl bg-surface-container-lowest shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between gap-space-md border border-surface-container-high/60 hover:-translate-y-1"
          >
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-secondary-fixed group-hover:bg-secondary-container group-hover:text-on-secondary-container transition-colors shadow-sm">
              <span className="material-symbols-outlined text-[24px]">coffee</span>
            </div>
            <div>
              <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider font-semibold block">Craft Curations</span>
              <h3 className="font-title-md text-title-md text-primary font-semibold mt-space-3xs group-hover:text-secondary transition-colors">Explore Menu</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 line-clamp-2">Nocturnal roasts, moonmilk brews, and golden savories.</p>
            </div>
            <div className="flex items-center text-secondary font-label-md text-label-md font-semibold pt-space-xs">
              <span>View Offerings</span>
              <span className="material-symbols-outlined text-[16px] ml-1 group-hover:translate-x-1 transition-transform">chevron_right</span>
            </div>
          </Link>

          {/* Action 2: Scan & Order */}
          <div
            onClick={() => navigate('/menu')}
            className="group p-space-md lg:p-space-lg rounded-xl bg-surface-container-lowest shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between gap-space-md cursor-pointer border border-surface-container-high/60 hover:-translate-y-1"
          >
            <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-on-secondary group-hover:bg-primary group-hover:text-secondary-fixed transition-colors shadow-sm">
              <span className="material-symbols-outlined text-[24px]">qr_code_scanner</span>
            </div>
            <div>
              <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider font-semibold block">Contactless</span>
              <h3 className="font-title-md text-title-md text-primary font-semibold mt-space-3xs group-hover:text-secondary transition-colors">Scan &amp; Order</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 line-clamp-2">Direct table service with live status tracking.</p>
            </div>
            <div className="flex items-center text-secondary font-label-md text-label-md font-semibold pt-space-xs">
              <span>Order Now</span>
              <span className="material-symbols-outlined text-[16px] ml-1 group-hover:translate-x-1 transition-transform">chevron_right</span>
            </div>
          </div>

          {/* Action 3: Gift Cards */}
          <Link
            to="/gift-cards"
            className="group p-space-md lg:p-space-lg rounded-xl bg-surface-container-lowest shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between gap-space-md border border-surface-container-high/60 hover:-translate-y-1"
          >
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-secondary-fixed group-hover:bg-secondary-container group-hover:text-on-secondary-container transition-colors shadow-sm">
              <span className="material-symbols-outlined text-[24px]">card_giftcard</span>
            </div>
            <div>
              <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider font-semibold block">Present Comfort</span>
              <h3 className="font-title-md text-title-md text-primary font-semibold mt-space-3xs group-hover:text-secondary transition-colors">Gift a Little Joy</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 line-clamp-2">Digital vouchers for friends, partners, and night owls.</p>
            </div>
            <div className="flex items-center text-secondary font-label-md text-label-md font-semibold pt-space-xs">
              <span>Send Voucher</span>
              <span className="material-symbols-outlined text-[16px] ml-1 group-hover:translate-x-1 transition-transform">chevron_right</span>
            </div>
          </Link>

          {/* Action 4: Stores */}
          <Link
            to="/stores"
            className="group p-space-md lg:p-space-lg rounded-xl bg-surface-container-lowest shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between gap-space-md border border-surface-container-high/60 hover:-translate-y-1"
          >
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-secondary-fixed group-hover:bg-secondary-container group-hover:text-on-secondary-container transition-colors shadow-sm">
              <span className="material-symbols-outlined text-[24px]">storefront</span>
            </div>
            <div>
              <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider font-semibold block">Locations</span>
              <h3 className="font-title-md text-title-md text-primary font-semibold mt-space-3xs group-hover:text-secondary transition-colors">Find a Sanctuary</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 line-clamp-2">Hours, directions, and quiet table reservations.</p>
            </div>
            <div className="flex items-center text-secondary font-label-md text-label-md font-semibold pt-space-xs">
              <span>Explore Locations</span>
              <span className="material-symbols-outlined text-[16px] ml-1 group-hover:translate-x-1 transition-transform">chevron_right</span>
            </div>
          </Link>
        </div>
      </section>

      {/* 3. SIGNATURES & FAVORITES CAROUSEL */}
      <section className="max-w-[1280px] mx-auto px-margin-mobile lg:px-margin-desktop py-space-2xl w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-sm mb-space-xl">
          <div>
            <span className="font-label-sm text-label-sm text-secondary uppercase font-bold tracking-widest block">
              Hand-Poured Signatures
            </span>
            <h2 className="font-headline-lg text-headline-md lg:text-headline-lg text-primary font-semibold mt-1">
              Curated Masterpieces
            </h2>
          </div>
          <Link
            to="/menu"
            className="text-secondary font-label-md text-label-md font-semibold hover:underline flex items-center gap-1"
          >
            <span>Browse Full Menu</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="h-80 bg-surface-container rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredItems.slice(0, 4).map((item) => (
              <div
                key={item.id}
                className="group bg-surface-container-low rounded-2xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 border border-surface-container flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-surface mb-4">
                    <img
                      src={item.imageUrl || 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800'}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 left-2 flex gap-1">
                      {item.isVeg && (
                        <span className="px-2 py-0.5 rounded-full bg-surface-container-lowest/90 text-emerald-800 text-[10px] font-bold shadow-sm">
                          Veg
                        </span>
                      )}
                      {item.isEggless && (
                        <span className="px-2 py-0.5 rounded-full bg-surface-container-lowest/90 text-amber-800 text-[10px] font-bold shadow-sm">
                          Eggless
                        </span>
                      )}
                    </div>
                  </div>

                  <h4 className="font-title-md text-[17px] font-semibold text-primary group-hover:text-secondary transition-colors">
                    {item.name}
                  </h4>
                  <p className="text-body-sm text-on-surface-variant line-clamp-2 mt-1 leading-snug">
                    {item.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 mt-2 border-t border-surface-container">
                  <div>
                    <span className="text-[11px] text-on-surface-variant block uppercase font-medium">Price</span>
                    <span className="font-title-md text-primary font-bold">₹{Number(item.price).toFixed(2)}</span>
                  </div>
                  <button
                    onClick={() => addItem(item)}
                    aria-label={`Add ${item.name} to order tray`}
                    className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center hover:bg-secondary transition-colors shadow-md active:scale-95"
                  >
                    <span className="material-symbols-outlined text-[20px]">add</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 4. ROASTERY SANCTUARY HIGHLIGHT */}
      <section className="w-full bg-surface-container py-space-3xl px-margin-mobile lg:px-margin-desktop border-y border-surface-container-high/60">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-space-2xl items-center">
          <div className="lg:col-span-6 space-y-space-md">
            <span className="font-label-sm text-label-sm text-secondary uppercase tracking-[0.2em] font-bold">
              Quiet Architectures
            </span>
            <h2 className="font-headline-lg text-headline-md lg:text-headline-lg text-primary font-semibold leading-tight">
              A Haven Built for Deep Focus &amp; Late-Hour Repose.
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
              We sculpted Luna &amp; Latte with dark teak timber, acoustic wool baffles, ambient low brass lanterns, and high-speed silent wireless mesh. Whether drafting your novel or savoring an origami pour-over, the hours belong to you.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-surface-container-lowest rounded-xl shadow-sm">
                <span className="material-symbols-outlined text-secondary text-[24px]">wifi</span>
                <p className="font-title-md text-[15px] font-semibold text-primary mt-1">Gigabit Sanctuary Wi-Fi</p>
                <p className="text-body-sm text-on-surface-variant">Low-latency quiet work bays</p>
              </div>
              <div className="p-4 bg-surface-container-lowest rounded-xl shadow-sm">
                <span className="material-symbols-outlined text-secondary text-[24px]">pets</span>
                <p className="font-title-md text-[15px] font-semibold text-primary mt-1">Pet-Friendly Courtyards</p>
                <p className="text-body-sm text-on-surface-variant">Warm welcomes for four-legged friends</p>
              </div>
            </div>
            <div className="pt-2">
              <Link
                to="/stores"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-on-primary font-label-md font-semibold hover:bg-primary-container transition-all"
              >
                <span>Reserve a Table at Bandra</span>
                <span className="material-symbols-outlined text-[18px]">calendar_month</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-surface-container-high aspect-video lg:aspect-[4/3]">
              <img
                src="https://lh3.googleusercontent.com/aida/AEtjO1Xd-k2HGZWt_jtfrcCflT8XiBlse6sfVbnFhxvROaYjqS3gSQVB1uC6RwuABV8p3I_q5-s9R2TyxZnKrnKCMg5GUDBRGYmWi5Hxt5s82k4W7W5Q5L1idlKZ--Vbcni2z3e0ZOdcdaqX964WaEvbawaF8nZI3hXl6JJTNvSj-pmxsbfdKSjtE4OfdvJ2jvNNrb_yKqvoAZmOGDkr7zsq4Rth9o01T_lbVkXErpHjy7v0aOFNeX9icFfLVTjr"
                alt="Luna & Latte Sanctuary Interior"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* QR Code Modal */}
      {qrModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/60 backdrop-blur-sm">
          <div className="bg-surface-container-lowest rounded-2xl p-6 max-w-sm w-full text-center space-y-4 border border-surface-container">
            <h3 className="font-headline-sm text-headline-sm font-semibold text-primary">Simulate Table Scan</h3>
            <p className="text-body-sm text-on-surface-variant">
              In sanctuary, point your device camera at the brass tabletop disc to link directly to Table 12.
            </p>
            <button
              onClick={() => {
                setQrModalOpen(false);
                navigate('/menu');
              }}
              className="w-full py-3 rounded-full bg-primary text-on-primary font-label-md font-semibold hover:bg-primary-container transition-all"
            >
              Enter Table 12 Ordering
            </button>
            <button
              onClick={() => setQrModalOpen(false)}
              className="text-on-surface-variant text-body-sm hover:text-primary transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
