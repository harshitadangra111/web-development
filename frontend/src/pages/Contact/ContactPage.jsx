import React, { useState } from 'react';
import { contactService } from '../../services/contactService';
import { useAuth } from '../../context/AuthContext';

const ContactPage = () => {
  const { user } = useAuth();
  const [name, setName] = useState(user?.fullName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phoneNumber || '');
  const [preferredVisitDate, setPreferredVisitDate] = useState('');
  const [category, setCategory] = useState('GENERAL');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await contactService.submitInquiry({
        name,
        email,
        phone,
        preferredVisitDate,
        category,
        message,
      });
      setSubmitted(true);
      setMessage('');
    } catch (err) {
      console.error('Contact error', err);
      alert('Could not submit message. Please try again.');
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
            <span className="material-symbols-outlined text-[18px]">mail</span>
            <span className="font-label-sm uppercase tracking-[0.25em] font-semibold">
              Converse With Roasters
            </span>
          </div>
          <h1 className="font-display-lg text-display-lg-mobile lg:text-display-lg text-primary font-semibold tracking-tight">
            We’d Love to Hear From You
          </h1>
          <p className="font-body-lg text-on-surface-variant mt-2 leading-relaxed">
            Inquiries regarding whole bean origin lots, private tasting bookings, feedback on your visit, or custom gift orders.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-2xl">
          {/* Left Column: Contact Details & Flagship Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-surface-container-low p-6 rounded-2xl border border-surface-container space-y-4">
              <h3 className="font-headline-sm text-headline-sm font-semibold text-primary">Bandra Nocturne Roastery</h3>
              <p className="text-body-sm text-on-surface-variant leading-relaxed">
                14 Pali Hill, Near Nargis Dutt Road, Bandra West, Mumbai, Maharashtra 400050
              </p>
              <div className="space-y-2 pt-2 text-body-sm">
                <div className="flex items-center gap-2 text-primary">
                  <span className="material-symbols-outlined text-secondary text-[20px]">phone</span>
                  <span>+91 22 2640 8890</span>
                </div>
                <div className="flex items-center gap-2 text-primary">
                  <span className="material-symbols-outlined text-secondary text-[20px]">alternate_email</span>
                  <span>concierge@lunaandlatte.com</span>
                </div>
                <div className="flex items-center gap-2 text-primary">
                  <span className="material-symbols-outlined text-secondary text-[20px]">schedule</span>
                  <span>Daily: 7:00 AM – 1:00 AM</span>
                </div>
              </div>
            </div>

            {/* FAQ Accordion preview */}
            <div className="bg-surface-container-low p-6 rounded-2xl border border-surface-container space-y-4">
              <h4 className="font-title-md font-bold text-primary">Frequently Whispered Questions</h4>
              <div className="space-y-3 text-body-sm">
                <div>
                  <p className="font-semibold text-primary">Are four-legged companions welcomed?</p>
                  <p className="text-on-surface-variant text-[13px] mt-0.5">Yes, our open-air courtyard and ground lounge are pet-friendly.</p>
                </div>
                <div>
                  <p className="font-semibold text-primary">Can I bring a laptop for remote work?</p>
                  <p className="text-on-surface-variant text-[13px] mt-0.5">Quiet focus booths are equipped with individual power outlets and Wi-Fi.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Inquiry Form */}
          <div className="lg:col-span-7 bg-surface-container-low p-8 rounded-3xl border border-surface-container shadow-sm">
            {submitted ? (
              <div className="text-center py-10 space-y-3">
                <span className="material-symbols-outlined text-[48px] text-secondary">mark_chat_read</span>
                <h3 className="font-headline-md font-bold text-primary">Message In Flight</h3>
                <p className="text-body-sm text-on-surface-variant max-w-sm mx-auto">
                  Thank you for reaching out. Our roastery team reads every word and will write back to {email} within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2 rounded-full bg-primary text-on-primary font-label-md font-semibold"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h2 className="font-headline-sm text-headline-sm font-semibold text-primary">Craft Your Message</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[12px] font-medium text-on-surface-variant">Your Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Maya Sengupta"
                      className="w-full bg-surface-container-lowest px-4 py-2.5 rounded-xl border border-outline-variant/60 text-body-sm mt-1 focus:outline-none focus:border-secondary"
                    />
                  </div>
                  <div>
                    <label className="text-[12px] font-medium text-on-surface-variant">Phone Number</label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98200 XXXXX"
                      className="w-full bg-surface-container-lowest px-4 py-2.5 rounded-xl border border-outline-variant/60 text-body-sm mt-1 focus:outline-none focus:border-secondary"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[12px] font-medium text-on-surface-variant">Email Address</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="maya@nocturnalcreatives.com"
                      className="w-full bg-surface-container-lowest px-4 py-2.5 rounded-xl border border-outline-variant/60 text-body-sm mt-1 focus:outline-none focus:border-secondary"
                    />
                  </div>
                  <div>
                    <label className="text-[12px] font-medium text-on-surface-variant">Inquiry Topic</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full bg-surface-container-lowest px-4 py-2.5 rounded-xl border border-outline-variant/60 text-body-sm mt-1 focus:outline-none focus:border-secondary"
                    >
                      <option value="GENERAL">General Café Inquiry</option>
                      <option value="COFFEE_SOURCING">Whole Bean Roasts &amp; Sourcing</option>
                      <option value="PRIVATE_EVENT">Event &amp; Gathering Inquiry</option>
                      <option value="FEEDBACK">Patron Experience Feedback</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[12px] font-medium text-on-surface-variant">Your Reflection or Query</label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Share what is on your mind..."
                    className="w-full bg-surface-container-lowest px-4 py-2.5 rounded-xl border border-outline-variant/60 text-body-sm mt-1 focus:outline-none focus:border-secondary"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 rounded-full bg-primary text-on-primary font-label-md uppercase tracking-wider font-semibold hover:bg-secondary transition-all shadow-md disabled:opacity-50"
                >
                  {submitting ? 'Sending Message...' : 'Dispatch Letter to Roasters'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
