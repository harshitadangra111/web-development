import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { orderService } from '../../services/orderService';
import { offerService } from '../../services/offerService';

const CartDrawer = () => {
  const { items, removeItem, updateQuantity, clearCart, subtotal, isDrawerOpen, closeDrawer } = useCart();
  const { user } = useAuth();

  const [orderType, setOrderType] = useState('DINE_IN');
  const [tableNumber, setTableNumber] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [name, setName] = useState(user?.fullName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phoneNumber || '');
  const [promoInput, setPromoInput] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [promoMessage, setPromoMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  if (!isDrawerOpen) return null;

  const handleApplyPromo = async () => {
    if (!promoInput) return;
    try {
      const offer = await offerService.validatePromoCode(promoInput.trim());
      if (offer) {
        let disc = 0;
        if (offer.discountPercentage > 0) {
          disc = (subtotal * offer.discountPercentage) / 100;
        } else if (offer.discountAmount > 0) {
          disc = offer.discountAmount;
        }
        setAppliedDiscount(disc);
        setPromoMessage(`✓ Applied: ${offer.title}`);
      }
    } catch (err) {
      setPromoMessage('Invalid or expired promo code');
      setAppliedDiscount(0);
    }
  };

  const gst = Math.max(0, (subtotal - appliedDiscount) * 0.05);
  const total = Math.max(0, subtotal - appliedDiscount + gst);

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (items.length === 0) return;

    setLoading(true);
    try {
      const payload = {
        customerName: name || 'Valued Guest',
        customerEmail: email || 'guest@lunaandlatte.com',
        customerPhone: phone || '+91 99999 99999',
        orderType,
        tableNumber: orderType === 'DINE_IN' ? tableNumber : null,
        deliveryAddress: orderType === 'DELIVERY' ? deliveryAddress : null,
        promoCode: appliedDiscount > 0 ? promoInput : null,
        paymentMethod: 'CREDIT_CARD',
        items: items.map((item) => ({
          menuItemId: item.id,
          quantity: item.quantity,
        })),
      };

      const result = await orderService.createOrder(payload);
      setConfirmedOrder(result);
      clearCart();
    } catch (err) {
      console.error('Checkout error', err);
      alert('Could not place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Dark backdrop */}
      <div
        onClick={() => {
          if (!confirmedOrder) closeDrawer();
        }}
        className="absolute inset-0 bg-primary/40 backdrop-blur-sm transition-opacity"
      />

      {/* Slide-over panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-surface-container-lowest shadow-2xl flex flex-col justify-between border-l border-surface-container">
          
          {/* Header */}
          <div className="p-6 border-b border-surface-container flex items-center justify-between bg-surface-container-low">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary text-[24px]">local_mall</span>
              <h2 className="font-headline-sm text-headline-sm font-semibold text-primary">Your Order Tray</h2>
            </div>
            <button
              onClick={() => {
                closeDrawer();
                setConfirmedOrder(null);
              }}
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-surface-container text-on-surface-variant hover:text-primary transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {confirmedOrder ? (
              /* Order Confirmation View */
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-secondary-container text-secondary flex items-center justify-center mx-auto ring-8 ring-secondary-container/40 animate-bounce">
                  <span className="material-symbols-outlined text-[36px]">task_alt</span>
                </div>
                <h3 className="font-headline-md text-headline-md font-bold text-primary">
                  Brewing in Motion!
                </h3>
                <p className="text-body-sm text-on-surface-variant">
                  Your order has been received by our head baristas.
                </p>
                <div className="p-4 bg-surface-container-low rounded-xl border border-surface-container text-left space-y-2">
                  <div className="flex justify-between text-body-sm">
                    <span className="text-on-surface-variant">Order Number:</span>
                    <span className="font-bold text-primary">{confirmedOrder.orderNumber}</span>
                  </div>
                  <div className="flex justify-between text-body-sm">
                    <span className="text-on-surface-variant">Order Type:</span>
                    <span className="font-semibold text-primary">{confirmedOrder.orderType}</span>
                  </div>
                  <div className="flex justify-between text-body-sm">
                    <span className="text-on-surface-variant">Total Amount:</span>
                    <span className="font-bold text-secondary">₹{confirmedOrder.totalAmount?.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-body-sm">
                    <span className="text-on-surface-variant">Status:</span>
                    <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed text-label-sm font-bold">
                      {confirmedOrder.status}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setConfirmedOrder(null);
                    closeDrawer();
                  }}
                  className="w-full py-3 rounded-full bg-primary text-on-primary font-label-md uppercase tracking-wider font-semibold shadow-md hover:bg-primary-container transition-all"
                >
                  Done
                </button>
              </div>
            ) : items.length === 0 ? (
              /* Empty Cart */
              <div className="text-center py-16 space-y-3">
                <div className="w-16 h-16 rounded-full bg-surface-container text-on-surface-variant flex items-center justify-center mx-auto">
                  <span className="material-symbols-outlined text-[32px]">coffee</span>
                </div>
                <p className="font-headline-sm text-[18px] text-primary font-semibold">Your tray is empty</p>
                <p className="text-body-sm text-on-surface-variant max-w-xs mx-auto">
                  Select your desired single-origin blends, chilled elixirs, or freshly baked artisan bites from our menu.
                </p>
              </div>
            ) : (
              /* Items List */
              <>
                <div className="divide-y divide-surface-container">
                  {items.map((item) => (
                    <div key={item.id} className="py-3 flex items-center justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <p className="font-title-md text-[15px] font-semibold text-primary truncate">{item.name}</p>
                        <p className="text-body-sm text-secondary font-medium">₹{Number(item.price).toFixed(2)}</p>
                      </div>
                      <div className="flex items-center gap-2 bg-surface-container px-2 py-1 rounded-full">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-surface-container-high text-primary"
                        >
                          <span className="material-symbols-outlined text-[16px]">remove</span>
                        </button>
                        <span className="text-label-md font-bold px-1">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-surface-container-high text-primary"
                        >
                          <span className="material-symbols-outlined text-[16px]">add</span>
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-outline hover:text-error transition-colors p-1"
                      >
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                      </button>
                    </div>
                  ))}
                </div>

                {/* Promo Code Input */}
                <div className="space-y-1 pt-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                      placeholder="Promo code (e.g. NOCTURNE20)"
                      className="flex-1 bg-surface-container px-3 py-2 rounded-lg text-body-sm border border-outline-variant/50 focus:outline-none focus:border-secondary uppercase"
                    />
                    <button
                      type="button"
                      onClick={handleApplyPromo}
                      className="px-4 py-2 bg-secondary text-on-secondary rounded-lg font-label-sm uppercase font-bold text-[11px] tracking-wider hover:bg-secondary/90 transition-all"
                    >
                      Apply
                    </button>
                  </div>
                  {promoMessage && (
                    <p className={`text-label-sm ${appliedDiscount > 0 ? 'text-emerald-700' : 'text-error'}`}>
                      {promoMessage}
                    </p>
                  )}
                </div>

                {/* Dining Options Form */}
                <form id="checkoutForm" onSubmit={handleCheckout} className="space-y-3 pt-2">
                  <p className="font-label-md font-bold text-primary uppercase tracking-wider text-[12px]">
                    Dining Experience
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    {['DINE_IN', 'TAKEAWAY', 'DELIVERY'].map((mode) => (
                      <button
                        key={mode}
                        type="button"
                        onClick={() => setOrderType(mode)}
                        className={`py-2 px-1 text-center rounded-lg text-label-sm font-semibold transition-all ${
                          orderType === mode
                            ? 'bg-primary text-on-primary shadow-sm'
                            : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                        }`}
                      >
                        {mode.replace('_', ' ')}
                      </button>
                    ))}
                  </div>

                  {orderType === 'DINE_IN' && (
                    <div>
                      <label className="text-[12px] font-medium text-on-surface-variant">Table Number</label>
                      <input
                        type="text"
                        value={tableNumber}
                        onChange={(e) => setTableNumber(e.target.value)}
                        placeholder="e.g. Table 7 or Brew Bar"
                        className="w-full bg-surface-container px-3 py-2 rounded-lg text-body-sm border border-outline-variant/50 mt-1 focus:outline-none focus:border-secondary"
                      />
                    </div>
                  )}

                  {orderType === 'DELIVERY' && (
                    <div>
                      <label className="text-[12px] font-medium text-on-surface-variant">Delivery Address</label>
                      <textarea
                        rows={2}
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                        placeholder="Street, building, floor, landmark..."
                        required
                        className="w-full bg-surface-container px-3 py-2 rounded-lg text-body-sm border border-outline-variant/50 mt-1 focus:outline-none focus:border-secondary"
                      />
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[12px] font-medium text-on-surface-variant">Name</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name"
                        required
                        className="w-full bg-surface-container px-3 py-2 rounded-lg text-body-sm border border-outline-variant/50 mt-1 focus:outline-none focus:border-secondary"
                      />
                    </div>
                    <div>
                      <label className="text-[12px] font-medium text-on-surface-variant">Phone</label>
                      <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91..."
                        required
                        className="w-full bg-surface-container px-3 py-2 rounded-lg text-body-sm border border-outline-variant/50 mt-1 focus:outline-none focus:border-secondary"
                      />
                    </div>
                  </div>
                </form>
              </>
            )}
          </div>

          {/* Footer Totals & Checkout Button */}
          {!confirmedOrder && items.length > 0 && (
            <div className="p-6 border-t border-surface-container bg-surface-container-low space-y-3">
              <div className="space-y-1.5 text-body-sm">
                <div className="flex justify-between text-on-surface-variant">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Discount</span>
                    <span>-₹{appliedDiscount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-on-surface-variant text-[13px]">
                  <span>GST (5%)</span>
                  <span>₹{gst.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-headline-sm font-bold text-primary pt-2 border-t border-surface-container">
                  <span>Total Due</span>
                  <span className="text-secondary">₹{total.toFixed(2)}</span>
                </div>
              </div>

              <button
                type="submit"
                form="checkoutForm"
                disabled={loading}
                className="w-full py-3.5 rounded-full bg-primary text-on-primary font-label-md uppercase tracking-wider font-semibold shadow-lg hover:bg-primary-container transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <span>Brewing Order...</span>
                ) : (
                  <>
                    <span>Confirm Order</span>
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
