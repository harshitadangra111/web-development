import React, { useState, useEffect } from 'react';
import { storeService } from '../../services/storeService';
import { reservationService } from '../../services/reservationService';
import { useAuth } from '../../context/AuthContext';
import Modal from '../../components/common/Modal';

const StoresPage = () => {
  const { user } = useAuth();
  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  // Reservation Modal state
  const [selectedStore, setSelectedStore] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [guestName, setGuestName] = useState(user?.fullName || '');
  const [guestEmail, setGuestEmail] = useState(user?.email || '');
  const [guestPhone, setGuestPhone] = useState(user?.phoneNumber || '');
  const [partySize, setPartySize] = useState(2);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('19:00');
  const [seating, setSeating] = useState('Standard Booth');
  const [specialRequests, setSpecialRequests] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchStores = async () => {
      setLoading(true);
      try {
        const data = await storeService.getAllStores(search);
        setStores(data || []);
      } catch (err) {
        console.error('Error fetching stores', err);
      } finally {
        setLoading(false);
      }
    };
    const timer = setTimeout(fetchStores, 200);
    return () => clearTimeout(timer);
  }, [search]);

  const handleOpenReserve = (store) => {
    setSelectedStore(store);
    setBookingSuccess(false);
    setIsModalOpen(true);
  };

  const handleSubmitReservation = async (e) => {
    e.preventDefault();
    if (!selectedStore) return;

    setSubmitting(true);
    try {
      const reservationDateTime = `${date || new Date().toISOString().split('T')[0]}T${time}:00`;
      await reservationService.createReservation({
        storeId: selectedStore.id,
        guestName,
        guestEmail,
        guestPhone,
        partySize: Number(partySize),
        reservationTime: reservationDateTime,
        seatingPreference: seating,
        specialRequests,
      });
      setBookingSuccess(true);
    } catch (err) {
      console.error('Reservation error', err);
      alert('Could not complete reservation. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-background min-h-screen py-space-2xl px-margin-mobile lg:px-margin-desktop">
      <div className="max-w-[1280px] mx-auto space-y-space-2xl">
        
        {/* Editorial Header */}
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 text-secondary mb-2">
            <span className="material-symbols-outlined text-[18px]">location_on</span>
            <span className="font-label-sm uppercase tracking-[0.25em] font-semibold">
              Atmospheric Locations
            </span>
          </div>
          <h1 className="font-display-lg text-display-lg-mobile lg:text-display-lg text-primary font-semibold tracking-tight">
            Find Your Sanctuary
          </h1>
          <p className="font-body-lg text-on-surface-variant mt-2">
            Step into our candlelit sanctuaries designed for uninterrupted reading, quiet conversations, and late-hour artisanal roastery rituals.
          </p>
        </div>

        {/* Search Input Bar */}
        <div className="max-w-md flex items-center gap-3 px-4 py-3 bg-surface-container rounded-xl shadow-sm border border-surface-container-high">
          <span className="material-symbols-outlined text-secondary text-[22px]">search</span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by neighborhood, street, or city..."
            className="w-full bg-transparent font-body-md text-primary placeholder:text-outline focus:outline-none"
          />
        </div>

        {/* Sanctuaries List */}
        {loading ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[1, 2].map((n) => (
              <div key={n} className="h-96 bg-surface-container rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {stores.map((store) => (
              <div
                key={store.id}
                className="bg-surface-container-low rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-surface-container flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-64 w-full overflow-hidden bg-surface">
                    <img
                      src={store.imageUrl || 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=800'}
                      alt={store.name}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-primary/80 backdrop-blur-md text-on-primary text-label-sm font-semibold">
                      {store.neighborhood}
                    </span>
                  </div>

                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="font-headline-sm text-headline-sm font-semibold text-primary">{store.name}</h3>
                      <p className="text-body-sm text-on-surface-variant mt-1 flex items-start gap-1.5">
                        <span className="material-symbols-outlined text-[18px] text-secondary shrink-0 mt-0.5">place</span>
                        <span>{store.address}, {store.city}</span>
                      </p>
                    </div>

                    <div className="flex items-center gap-2 text-body-sm text-secondary font-medium">
                      <span className="material-symbols-outlined text-[18px]">schedule</span>
                      <span>{store.openingHours || '7:00 AM – Midnight'}</span>
                    </div>

                    {store.amenities && (
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {store.amenities.split(',').map((am, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant text-[11px] font-medium"
                          >
                            {am.trim()}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-surface-container flex items-center justify-between gap-4 mt-4">
                  <div className="text-[13px] text-on-surface-variant">
                    <span className="font-semibold text-primary">{store.phone}</span>
                  </div>
                  <button
                    onClick={() => handleOpenReserve(store)}
                    className="px-5 py-2.5 rounded-full bg-primary text-on-primary font-label-sm uppercase tracking-wider font-semibold hover:bg-secondary transition-all flex items-center gap-2 shadow-sm"
                  >
                    <span>Reserve Table</span>
                    <span className="material-symbols-outlined text-[16px]">event_seat</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Reservation Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={`Reserve Table — ${selectedStore?.name}`}
        >
          {bookingSuccess ? (
            <div className="text-center py-6 space-y-3">
              <span className="material-symbols-outlined text-[48px] text-secondary">verified</span>
              <h4 className="font-headline-sm text-headline-sm font-bold text-primary">Table Confirmed!</h4>
              <p className="text-body-sm text-on-surface-variant max-w-sm mx-auto">
                Your quiet nook has been reserved. A confirmation note has been dispatched to {guestEmail}.
              </p>
              <button
                onClick={() => setIsModalOpen(false)}
                className="mt-4 px-6 py-2.5 rounded-full bg-primary text-on-primary font-label-md font-semibold"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmitReservation} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[12px] font-medium text-on-surface-variant">Guest Name</label>
                  <input
                    type="text"
                    required
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="Your name"
                    className="w-full bg-surface-container px-3 py-2 rounded-lg text-body-sm mt-1 focus:outline-none focus:border-secondary"
                  />
                </div>
                <div>
                  <label className="text-[12px] font-medium text-on-surface-variant">Phone</label>
                  <input
                    type="text"
                    required
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    placeholder="+91..."
                    className="w-full bg-surface-container px-3 py-2 rounded-lg text-body-sm mt-1 focus:outline-none focus:border-secondary"
                  />
                </div>
              </div>

              <div>
                <label className="text-[12px] font-medium text-on-surface-variant">Email</label>
                <input
                  type="email"
                  required
                  value={guestEmail}
                  onChange={(e) => setGuestEmail(e.target.value)}
                  placeholder="name@sanctuary.com"
                  className="w-full bg-surface-container px-3 py-2 rounded-lg text-body-sm mt-1 focus:outline-none focus:border-secondary"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-[12px] font-medium text-on-surface-variant">Date</label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-surface-container px-3 py-2 rounded-lg text-body-sm mt-1 focus:outline-none focus:border-secondary"
                  />
                </div>
                <div>
                  <label className="text-[12px] font-medium text-on-surface-variant">Time</label>
                  <input
                    type="time"
                    required
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full bg-surface-container px-3 py-2 rounded-lg text-body-sm mt-1 focus:outline-none focus:border-secondary"
                  />
                </div>
                <div>
                  <label className="text-[12px] font-medium text-on-surface-variant">Party Size</label>
                  <input
                    type="number"
                    min="1"
                    max="16"
                    value={partySize}
                    onChange={(e) => setPartySize(e.target.value)}
                    className="w-full bg-surface-container px-3 py-2 rounded-lg text-body-sm mt-1 focus:outline-none focus:border-secondary"
                  />
                </div>
              </div>

              <div>
                <label className="text-[12px] font-medium text-on-surface-variant">Seating Preference</label>
                <select
                  value={seating}
                  onChange={(e) => setSeating(e.target.value)}
                  className="w-full bg-surface-container px-3 py-2 rounded-lg text-body-sm mt-1 focus:outline-none focus:border-secondary"
                >
                  <option value="Standard Booth">Standard Velvet Booth</option>
                  <option value="Window Twilight View">Arched Window Twilight View</option>
                  <option value="Siphon Bar Counter">Siphon &amp; Pour-Over Brew Bar</option>
                  <option value="Quiet Study Nook">Quiet Study Nook</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 rounded-full bg-primary text-on-primary font-label-md uppercase tracking-wider font-semibold hover:bg-secondary transition-all disabled:opacity-50 mt-2"
              >
                {submitting ? 'Confirming...' : 'Complete Table Reservation'}
              </button>
            </form>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default StoresPage;
