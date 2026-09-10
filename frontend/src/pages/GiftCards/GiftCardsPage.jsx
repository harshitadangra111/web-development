import React, { useState } from 'react';
import { giftCardService } from '../../services/giftCardService';
import { useAuth } from '../../context/AuthContext';

const GiftCardsPage = () => {
  const { user } = useAuth();

  // Purchase Form State
  const [selectedAmount, setSelectedAmount] = useState(2500);
  const [customAmount, setCustomAmount] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [senderName, setSenderName] = useState(user?.fullName || '');
  const [senderEmail, setSenderEmail] = useState(user?.email || '');
  const [message, setMessage] = useState('');
  const [theme, setTheme] = useState('CRESCENT_GOLD');
  const [purchasedCard, setPurchasedCard] = useState(null);
  const [purchasing, setPurchasing] = useState(false);

  // Check Balance State
  const [checkCardNumber, setCheckCardNumber] = useState('');
  const [checkPin, setCheckPin] = useState('');
  const [balanceResult, setBalanceResult] = useState(null);
  const [checking, setChecking] = useState(false);
  const [checkError, setCheckError] = useState('');

  const finalAmount = customAmount ? Number(customAmount) : selectedAmount;

  const handlePurchase = async (e) => {
    e.preventDefault();
    setPurchasing(true);
    try {
      const card = await giftCardService.purchaseGiftCard({
        amount: finalAmount,
        recipientName,
        recipientEmail,
        senderName,
        senderEmail,
        message,
        theme,
      });
      setPurchasedCard(card);
    } catch (err) {
      console.error('Gift card purchase error', err);
      alert('Could not purchase gift card. Please check the details.');
    } finally {
      setPurchasing(false);
    }
  };

  const handleCheckBalance = async (e) => {
    e.preventDefault();
    setChecking(true);
    setCheckError('');
    setBalanceResult(null);
    try {
      const result = await giftCardService.checkBalance(checkCardNumber, checkPin);
      setBalanceResult(result);
    } catch (err) {
      setCheckError('Card not found or PIN incorrect.');
    } finally {
      setChecking(false);
    }
  };

  return (
    <div className="w-full bg-background min-h-screen py-space-2xl px-margin-mobile lg:px-margin-desktop">
      <div className="max-w-[1280px] mx-auto space-y-space-3xl">
        
        {/* Editorial Intro */}
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 text-secondary mb-2">
            <span className="material-symbols-outlined text-[18px]">card_giftcard</span>
            <span className="font-label-sm uppercase tracking-[0.25em] font-semibold">
              Midnight Envelopes
            </span>
          </div>
          <h1 className="font-display-lg text-display-lg-mobile lg:text-display-lg text-primary font-semibold tracking-tight">
            Give Them a Little Joy
          </h1>
          <p className="font-body-lg text-on-surface-variant mt-2 leading-relaxed">
            Present a quiet escape: single-origin nocturnal tastings, warm artisanal pastries, and tranquil sanctuary hours for your cherished friends.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-2xl items-start">
          {/* Left Column: Purchase Gift Card */}
          <div className="lg:col-span-7 bg-surface-container-low p-8 rounded-3xl border border-surface-container shadow-sm space-y-6">
            <h2 className="font-headline-sm text-headline-sm font-semibold text-primary">
              Curate a Digital Gift Card
            </h2>

            {purchasedCard ? (
              <div className="p-6 bg-surface-container-lowest rounded-2xl border border-secondary/40 text-center space-y-3">
                <span className="material-symbols-outlined text-[48px] text-secondary">mark_email_read</span>
                <h3 className="font-headline-sm font-bold text-primary">Gift Card Dispatched!</h3>
                <p className="text-body-sm text-on-surface-variant">
                  We have sent the digital voucher to <strong className="text-primary">{purchasedCard.recipientEmail}</strong>.
                </p>
                <div className="p-4 bg-surface-container rounded-xl font-mono text-center space-y-1">
                  <p className="text-[12px] text-outline">Card Number</p>
                  <p className="text-[18px] font-bold text-primary tracking-wider">{purchasedCard.cardNumber}</p>
                  <p className="text-body-sm text-secondary font-semibold">Balance: ₹{purchasedCard.currentBalance?.toFixed(2)}</p>
                </div>
                <button
                  onClick={() => setPurchasedCard(null)}
                  className="mt-2 px-6 py-2 rounded-full bg-primary text-on-primary text-label-sm font-semibold"
                >
                  Send Another Card
                </button>
              </div>
            ) : (
              <form onSubmit={handlePurchase} className="space-y-6">
                {/* Denominations */}
                <div>
                  <label className="font-label-md text-label-md text-on-surface-variant uppercase font-bold block mb-2">
                    Select Amount (INR)
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                    {[1000, 2000, 2500, 5000].map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => {
                          setSelectedAmount(amt);
                          setCustomAmount('');
                        }}
                        className={`py-3 rounded-xl font-headline-sm text-[16px] font-bold transition-all ${
                          !customAmount && selectedAmount === amt
                            ? 'bg-primary text-on-primary shadow-md'
                            : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
                        }`}
                      >
                        ₹{amt}
                      </button>
                    ))}
                  </div>
                  <input
                    type="number"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    placeholder="Or enter custom amount (e.g. 3500)"
                    className="w-full bg-surface-container-lowest px-4 py-3 rounded-xl border border-outline-variant/60 text-body-sm mt-3 focus:outline-none focus:border-secondary"
                  />
                </div>

                {/* Recipient Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[12px] font-medium text-on-surface-variant">Recipient Name</label>
                    <input
                      type="text"
                      required
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                      placeholder="e.g. Devika Sharma"
                      className="w-full bg-surface-container-lowest px-4 py-2.5 rounded-xl border border-outline-variant/60 text-body-sm mt-1 focus:outline-none focus:border-secondary"
                    />
                  </div>
                  <div>
                    <label className="text-[12px] font-medium text-on-surface-variant">Recipient Email</label>
                    <input
                      type="email"
                      required
                      value={recipientEmail}
                      onChange={(e) => setRecipientEmail(e.target.value)}
                      placeholder="devika@nocturne.in"
                      className="w-full bg-surface-container-lowest px-4 py-2.5 rounded-xl border border-outline-variant/60 text-body-sm mt-1 focus:outline-none focus:border-secondary"
                    />
                  </div>
                </div>

                {/* Sender Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[12px] font-medium text-on-surface-variant">Your Name</label>
                    <input
                      type="text"
                      required
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      placeholder="e.g. Alistair Vance"
                      className="w-full bg-surface-container-lowest px-4 py-2.5 rounded-xl border border-outline-variant/60 text-body-sm mt-1 focus:outline-none focus:border-secondary"
                    />
                  </div>
                  <div>
                    <label className="text-[12px] font-medium text-on-surface-variant">Your Email</label>
                    <input
                      type="email"
                      required
                      value={senderEmail}
                      onChange={(e) => setSenderEmail(e.target.value)}
                      placeholder="alistair@nocturne.cafe"
                      className="w-full bg-surface-container-lowest px-4 py-2.5 rounded-xl border border-outline-variant/60 text-body-sm mt-1 focus:outline-none focus:border-secondary"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[12px] font-medium text-on-surface-variant">Personal Dedication</label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write a warm note for quiet moments..."
                    className="w-full bg-surface-container-lowest px-4 py-2.5 rounded-xl border border-outline-variant/60 text-body-sm mt-1 focus:outline-none focus:border-secondary"
                  />
                </div>

                <button
                  type="submit"
                  disabled={purchasing}
                  className="w-full py-3.5 rounded-full bg-primary text-on-primary font-label-md uppercase tracking-wider font-semibold hover:bg-secondary transition-all shadow-md disabled:opacity-50"
                >
                  {purchasing ? 'Crafting Voucher...' : `Send Gift Voucher — ₹${finalAmount}`}
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Check Balance Card */}
          <div className="lg:col-span-5 bg-surface-container-low p-8 rounded-3xl border border-surface-container shadow-sm space-y-6">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary text-[24px]">account_balance_wallet</span>
              <h2 className="font-headline-sm text-headline-sm font-semibold text-primary">Check Card Balance</h2>
            </div>
            <p className="text-body-sm text-on-surface-variant">
              Already possess a physical or digital Luna &amp; Latte gift card? Enter the 16-digit voucher number and security PIN.
            </p>

            <form onSubmit={handleCheckBalance} className="space-y-4">
              <div>
                <label className="text-[12px] font-medium text-on-surface-variant">16-Digit Card Number</label>
                <input
                  type="text"
                  required
                  value={checkCardNumber}
                  onChange={(e) => setCheckCardNumber(e.target.value)}
                  placeholder="e.g. 8820-4491-3302-1194"
                  className="w-full bg-surface-container-lowest px-4 py-2.5 rounded-xl border border-outline-variant/60 text-body-sm mt-1 font-mono focus:outline-none focus:border-secondary"
                />
              </div>

              <div>
                <label className="text-[12px] font-medium text-on-surface-variant">4-Digit Security PIN</label>
                <input
                  type="password"
                  required
                  maxLength={6}
                  value={checkPin}
                  onChange={(e) => setCheckPin(e.target.value)}
                  placeholder="PIN"
                  className="w-full bg-surface-container-lowest px-4 py-2.5 rounded-xl border border-outline-variant/60 text-body-sm mt-1 font-mono focus:outline-none focus:border-secondary"
                />
              </div>

              <button
                type="submit"
                disabled={checking}
                className="w-full py-3 rounded-full bg-secondary text-on-secondary font-label-md font-semibold hover:bg-secondary/90 transition-all shadow-sm"
              >
                {checking ? 'Verifying...' : 'Check Stored Balance'}
              </button>
            </form>

            {checkError && (
              <div className="p-3 rounded-xl bg-error-container/30 border border-error/20 text-error text-body-sm text-center">
                {checkError}
              </div>
            )}

            {balanceResult && (
              <div className="p-5 rounded-2xl bg-surface-container-lowest border border-secondary/40 text-center space-y-2">
                <span className="font-label-sm uppercase tracking-wider text-outline text-[11px]">Available Balance</span>
                <p className="font-display-lg text-[32px] font-bold text-primary">₹{balanceResult.currentBalance?.toFixed(2)}</p>
                <p className="text-[12px] text-on-surface-variant">Card: {balanceResult.cardNumber}</p>
                <span className="inline-block px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                  Active
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GiftCardsPage;
