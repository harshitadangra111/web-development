import React, { useState, useEffect } from 'react';
import { menuService } from '../../services/menuService';
import { useCart } from '../../context/CartContext';

const MenuPage = () => {
  const { addItem } = useCart();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');
  const [vegOnly, setVegOnly] = useState(false);
  const [eggless, setEggless] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const catData = await menuService.getCategories();
        setCategories(catData || []);
      } catch (err) {
        console.error('Error fetching categories', err);
      }
    };
    fetchCategories();
  }, []);

  // Load menu items based on filters
  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const data = await menuService.getMenuItems({
          search,
          category: selectedCategory,
          vegOnly,
          eggless,
        });
        setItems(data || []);
      } catch (err) {
        console.error('Error fetching menu items', err);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchItems, 200);
    return () => clearTimeout(timer);
  }, [search, selectedCategory, vegOnly, eggless]);

  return (
    <div className="w-full bg-background min-h-screen">
      {/* 1. ATMOSPHERIC EDITORIAL INTRODUCTION */}
      <section className="relative w-full overflow-hidden bg-surface-container-lowest pt-space-xl pb-space-2xl px-margin-mobile lg:px-margin-desktop border-b border-surface-container">
        {/* Ambient Golden Glows */}
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-secondary-fixed/30 blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -right-48 w-80 h-80 rounded-full bg-primary-fixed/20 blur-3xl pointer-events-none" />

        <div className="max-w-[1280px] mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-lg">
            <div className="max-w-2xl">
              <div className="flex items-center gap-space-xs mb-space-xs text-secondary">
                <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
                <span className="font-label-sm text-label-sm tracking-[0.25em] uppercase font-semibold">
                  Artisanal Provisions &amp; Roastery
                </span>
              </div>
              <h1 className="font-display-lg text-display-lg-mobile lg:text-display-lg text-primary tracking-tight font-semibold">
                Made Fresh. <br className="hidden sm:inline" />
                <span className="italic font-normal text-secondary">Served With Love.</span>
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant mt-space-sm max-w-xl">
                Single-origin nocturnal roasts, slow-brewed elixirs, and wholesome artisan bites crafted to awaken the senses beneath twilight or dawn.
              </p>
            </div>

            {/* Quick Stats / Highlights */}
            <div className="flex items-center gap-space-lg self-start md:self-auto bg-surface-container-low px-space-lg py-space-sm rounded-xl shadow-sm border border-surface-container">
              <div className="flex flex-col">
                <span className="font-headline-sm text-headline-sm font-bold text-primary">100%</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Organic Beans</span>
              </div>
              <div className="w-px h-8 bg-surface-variant" />
              <div className="flex flex-col">
                <span className="font-headline-sm text-headline-sm font-bold text-secondary">4.9 ★</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Patron Praise</span>
              </div>
              <div className="w-px h-8 bg-surface-variant" />
              <div className="flex flex-col">
                <span className="font-headline-sm text-headline-sm font-bold text-primary">Zero</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Artificial Flavors</span>
              </div>
            </div>
          </div>

          {/* Live Search and Dietary Filtering Toolbar */}
          <div className="mt-space-xl grid grid-cols-1 md:grid-cols-12 gap-space-sm items-center bg-surface-container p-space-xs rounded-xl shadow-sm">
            <div className="md:col-span-7 flex items-center gap-space-xs px-space-sm bg-surface-container-lowest rounded-lg h-12 shadow-sm border border-surface-container">
              <span className="material-symbols-outlined text-secondary text-[22px]">search</span>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search cappuccino, avocado toast, lava cake..."
                className="w-full bg-transparent font-body-md text-body-md text-primary placeholder:text-outline focus:outline-none"
              />
              {search && (
                <button onClick={() => setSearch('')} className="text-outline hover:text-primary">
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              )}
            </div>

            <div className="md:col-span-5 flex items-center justify-between md:justify-end gap-space-xs px-space-2xs">
              <div className="flex items-center gap-space-2xs bg-surface-container-lowest px-space-xs py-space-2xs rounded-lg shadow-sm border border-surface-container">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase font-bold tracking-wider">
                  Preferences:
                </span>
                <button
                  type="button"
                  onClick={() => setVegOnly(!vegOnly)}
                  className={`px-space-xs py-1 rounded-full text-label-sm font-label-sm flex items-center gap-1.5 transition-all ${
                    vegOnly ? 'bg-emerald-800 text-white font-bold shadow-sm' : 'bg-surface-container-high text-on-surface'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${vegOnly ? 'bg-white' : 'bg-emerald-600'}`} />
                  <span>Veg Only</span>
                </button>
                <button
                  type="button"
                  onClick={() => setEggless(!eggless)}
                  className={`px-space-xs py-1 rounded-full text-label-sm font-label-sm flex items-center gap-1.5 transition-all ${
                    eggless ? 'bg-amber-800 text-white font-bold shadow-sm' : 'bg-surface-container-high text-on-surface'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${eggless ? 'bg-white' : 'bg-amber-600'}`} />
                  <span>Eggless</span>
                </button>
              </div>
            </div>
          </div>

          {/* Category Filter Pills Bar */}
          <div className="mt-space-md overflow-x-auto pb-space-2xs scrollbar-none flex items-center gap-space-xs">
            <button
              onClick={() => setSelectedCategory('All')}
              className={`category-pill whitespace-nowrap px-space-md py-space-xs rounded-full font-label-md text-label-md transition-all shadow-sm ${
                selectedCategory === 'All'
                  ? 'bg-primary text-on-primary font-semibold'
                  : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
              }`}
            >
              All Offerings
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.name)}
                className={`category-pill whitespace-nowrap px-space-md py-space-xs rounded-full font-label-md text-label-md transition-all shadow-sm ${
                  selectedCategory === cat.name
                    ? 'bg-primary text-on-primary font-semibold'
                    : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
                }`}
              >
                {cat.displayName}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. CURATED MENU GRID */}
      <section className="max-w-[1280px] mx-auto w-full px-margin-mobile lg:px-margin-desktop pt-space-xl pb-space-4xl">
        <div className="flex items-center justify-between mb-space-xl">
          <div>
            <p className="font-label-sm text-label-sm text-secondary uppercase font-bold tracking-widest">
              Handmade Selection
            </p>
            <h2 className="font-headline-lg text-headline-md lg:text-headline-lg text-primary font-semibold">
              {selectedCategory === 'All' ? 'All Café Delights' : selectedCategory}
            </h2>
          </div>
          <div className="text-right text-on-surface-variant font-label-md text-label-md">
            <span>{items.length} offerings available</span>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <div key={n} className="h-80 bg-surface-container rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-20 bg-surface-container-low rounded-2xl border border-surface-container">
            <span className="material-symbols-outlined text-[48px] text-outline">search_off</span>
            <p className="font-headline-sm text-primary font-semibold mt-2">No offerings found</p>
            <p className="text-body-sm text-on-surface-variant mt-1">
              Try adjusting your dietary preferences or search query.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="group bg-surface-container-low rounded-2xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 border border-surface-container flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-surface mb-4">
                    <img
                      src={item.imageUrl || 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=800'}
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
                      {item.isFeatured && (
                        <span className="px-2 py-0.5 rounded-full bg-secondary text-on-secondary text-[10px] font-bold shadow-sm">
                          Signature
                        </span>
                      )}
                    </div>
                  </div>

                  <h3 className="font-title-md text-[17px] font-semibold text-primary group-hover:text-secondary transition-colors">
                    {item.name}
                  </h3>
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
    </div>
  );
};

export default MenuPage;
