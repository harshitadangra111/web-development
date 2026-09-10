import React, { useState } from 'react';
import { celebrationService } from '../../services/celebrationService';
import { useAuth } from '../../context/AuthContext';

const BirthdayPage = () => {
  const { user } = useAuth();
  const [celebrationType, setCelebrationType] = useState('BIRTHDAY');
  const [contactName, setContactName] = useState(user?.fullName || '');
  const [contactEmail, setContactEmail] = useState(user?.email || '');
  const [contactPhone, setContactPhone] = useState(user?.phoneNumber || '');
  const [eventDate, setEventDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('Twilight Evening (18:00 – 21:00)');
  const [guestCount, setGuestCount] = useState(10);
  const [cakePreference, setCakePreference] = useState('Midnight Molten Chocolate');
  const [packageTier, setPackageTier] = useState('CELESTIAL');
  const [specialRequests, setSpecialRequests] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const dateTime = `${eventDate || new Date().toISOString().split('T')[0]}T18:00:00`;
      await celebrationService.bookCelebration({
        celebrationType,
        contactName,
        contactEmail,
        contactPhone,
        eventDate: dateTime,
        timeSlot,
        guestCount: Number(guestCount),
        cakePreference,
        packageTier,
        specialRequests,
      });
      setSubmitted(true);
    } catch (err) {
      console.error('Booking error', err);
      alert('Could not submit inquiry. Please verify the information.');
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
            <span className="material-symbols-outlined text-[18px]">celebration</span>
            <span className="font-label-sm uppercase tracking-[0.25em] font-semibold">
              Private Soirées &amp; Milestones
            </span>
          </div>
          <h1 className="font-display-lg text-display-lg-mobile lg:text-display-lg text-primary font-semibold tracking-tight">
            Celebrate Under the Crescent Moon
          </h1>
          <p className="font-body-lg text-on-surface-variant mt-2 leading-relaxed">
            Reserve our private roastery alcoves, curated tasting flights, artisanal pastry towers, and warm candlelight for birthdays and milestone evenings.
          </p>
        </div>

        {/* Tiers Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            onClick={() => setPackageTier('TWILIGHT')}
            className={`p-6 rounded-2xl border cursor-pointer transition-all ${
              packageTier === 'TWILIGHT'
                ? 'bg-primary text-on-primary border-primary shadow-lg scale-105'
                : 'bg-surface-container-low text-on-surface border-surface-container'
            }`}
          >
            <span className="font-label-sm uppercase tracking-wider text-secondary-fixed">Tier I</span>
            <h3 className="font-headline-sm text-headline-sm font-bold mt-1">Twilight Intimate</h3>
            <p className="text-body-sm opacity-80 mt-2">Up to 8 patrons. Includes single-origin pour-overs, artisanal savory croissants, and signature dessert platter.</p>
          </div>

          <div
            onClick={() => setPackageTier('CELESTIAL')}
            className={`p-6 rounded-2xl border cursor-pointer transition-all ${
              packageTier === 'CELESTIAL'
                ? 'bg-primary text-on-primary border-primary shadow-lg scale-105'
                : 'bg-surface-container-low text-on-surface border-surface-container'
            }`}
          >
            <span className="font-label-sm uppercase tracking-wider text-secondary-fixed">Tier II — Curated Choice</span>
            <h3 className="font-headline-sm text-headline-sm font-bold mt-1">Celestial Gathering</h3>
            <p className="text-body-sm opacity-80 mt-2">Up to 18 patrons. Dedicated barista station, personalized latte art stencil, whole birthday cake, and hot/cold flights.</p>
          </div>

          <div
            onClick={() => setPackageTier('MIDNIGHT_SOLSTICE')}
            className={`p-6 rounded-2xl border cursor-pointer transition-all ${
              packageTier === 'MIDNIGHT_SOLSTICE'
                ? 'bg-primary text-on-primary border-primary shadow-lg scale-105'
                : 'bg-surface-container-low text-on-surface border-surface-container'
            }`}
          >
            <span className="font-label-sm uppercase tracking-wider text-secondary-fixed">Tier III</span>
            <h3 className="font-headline-sm text-headline-sm font-bold mt-1">Midnight Solstice</h3>
            <p className="text-body-sm opacity-80 mt-2">Full mezzanine buyout. Siphon flame demonstration, multi-course savory pairings, custom favors, and live acoustic music.</p>
          </div>
        </div>

        {/* Booking Form */}
        <div className="bg-surface-container-low p-8 rounded-3xl border border-surface-container shadow-sm max-w-3xl mx-auto">
          {submitted ? (
            <div className="text-center py-8 space-y-3">
              <span className="material-symbols-outlined text-[48px] text-secondary">verified</span>
              <h3 className="font-headline-md font-bold text-primary">Inquiry Received</h3>
              <p className="text-body-sm text-on-surface-variant max-w-md mx-auto">
                Our Private Events Concierge will reach out to <strong className="text-primary">{contactEmail}</strong> to customize menu flights and table arrangement.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-6 py-2.5 rounded-full bg-primary text-on-primary font-label-md font-semibold"
              >
                Plan Another Event
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <h2 className="font-headline-sm text-headline-sm font-semibold text-primary">
                Event Reservation Details
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[12px] font-medium text-on-surface-variant">Occasion Type</label>
                  <select
                    value={celebrationType}
                    onChange={(e) => setCelebrationType(e.target.value)}
                    className="w-full bg-surface-container px-3 py-2.5 rounded-xl text-body-sm mt-1 focus:outline-none focus:border-secondary"
                  >
                    <option value="BIRTHDAY">Birthday Celebration</option>
                    <option value="ANNIVERSARY">Anniversary Milestone</option>
                    <option value="PRIVATE_SOIRÉE">Private Roastery Soirée</option>
                    <option value="CREATIVE_COMMUNITY">Creative Gathering / Book Reading</option>
                  </select>
                </div>
                <div>
                  <label className="text-[12px] font-medium text-on-surface-variant">Expected Guests</label>
                  <input
                    type="number"
                    min={2}
                    max={60}
                    value={guestCount}
                    onChange={(e) => setGuestCount(e.target.value)}
                    className="w-full bg-surface-container px-3 py-2.5 rounded-xl text-body-sm mt-1 focus:outline-none focus:border-secondary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[12px] font-medium text-on-surface-variant">Date</label>
                  <input
                    type="date"
                    required
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full bg-surface-container px-3 py-2.5 rounded-xl text-body-sm mt-1 focus:outline-none focus:border-secondary"
                  />
                </div>
                <div>
                  <label className="text-[12px] font-medium text-on-surface-variant">Time Slot</label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full bg-surface-container px-3 py-2.5 rounded-xl text-body-sm mt-1 focus:outline-none focus:border-secondary"
                  >
                    <option value="Morning Golden Hour (09:00 – 12:00)">Morning Golden Hour (09:00 – 12:00)</option>
                    <option value="Afternoon Roast & Read (14:00 – 17:00)">Afternoon Roast &amp; Read (14:00 – 17:00)</option>
                    <option value="Twilight Evening (18:00 – 21:00)">Twilight Evening (18:00 – 21:00)</option>
                    <option value="Midnight Nocturne (21:30 – 00:30)">Midnight Nocturne (21:30 – 00:30)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-[12px] font-medium text-on-surface-variant">Contact Name</label>
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full bg-surface-container px-3 py-2.5 rounded-xl text-body-sm mt-1 focus:outline-none focus:border-secondary"
                  />
                </div>
                <div>
                  <label className="text-[12px] font-medium text-on-surface-variant">Email</label>
                  <input
                    type="email"
                    required
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="w-full bg-surface-container px-3 py-2.5 rounded-xl text-body-sm mt-1 focus:outline-none focus:border-secondary"
                  />
                </div>
                <div>
                  <label className="text-[12px] font-medium text-on-surface-variant">Phone</label>
                  <input
                    type="text"
                    required
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    className="w-full bg-surface-container px-3 py-2.5 rounded-xl text-body-sm mt-1 focus:outline-none focus:border-secondary"
                  />
                </div>
              </div>

              <div>
                <label className="text-[12px] font-medium text-on-surface-variant">Cake Selection</label>
                <select
                  value={cakePreference}
                  onChange={(e) => setCakePreference(e.target.value)}
                  className="w-full bg-surface-container px-3 py-2.5 rounded-xl text-body-sm mt-1 focus:outline-none focus:border-secondary"
                >
                  <option value="Midnight Molten Chocolate">Midnight 70% Dark Chocolate &amp; Raspberry</option>
                  <option value="Bourbon Vanilla Bean Sponge">Bourbon Vanilla Bean &amp; Salted Caramel</option>
                  <option value="Matcha Jasmine Torte">Matcha Jasmine &amp; White Chocolate Torte (Eggless)</option>
                  <option value="Custom Creation">Custom Recipe Requested</option>
                </select>
              </div>

              <div>
                <label className="text-[12px] font-medium text-on-surface-variant">Special Wishes or Dietary Guidance</label>
                <textarea
                  rows={3}
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="Flower arrangement, acoustic playlist notes, allergen notices..."
                  className="w-full bg-surface-container px-3 py-2.5 rounded-xl text-body-sm mt-1 focus:outline-none focus:border-secondary"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 rounded-full bg-primary text-on-primary font-label-md uppercase tracking-wider font-semibold hover:bg-secondary transition-all shadow-md disabled:opacity-50"
              >
                {submitting ? 'Submitting Reservation...' : 'Inquire for Private Celebration'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default BirthdayPage;
