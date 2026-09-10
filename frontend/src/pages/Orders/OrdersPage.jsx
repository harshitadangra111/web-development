import React, { useState, useEffect } from 'react';
import { orderService } from '../../services/orderService';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const OrdersPage = () => {
  const { user, isAuthenticated } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!isAuthenticated) return;
      try {
        const data = await orderService.getMyOrders();
        setOrders(data || []);
      } catch (err) {
        console.error('Error fetching user orders', err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [isAuthenticated]);

  return (
    <div className="w-full bg-background min-h-screen py-space-2xl px-margin-mobile lg:px-margin-desktop">
      <div className="max-w-[1000px] mx-auto space-y-space-2xl">
        
        {/* Header */}
        <div>
          <div className="inline-flex items-center gap-2 text-secondary mb-2">
            <span className="material-symbols-outlined text-[18px]">receipt_long</span>
            <span className="font-label-sm uppercase tracking-[0.25em] font-semibold">
              Patron Record
            </span>
          </div>
          <h1 className="font-display-lg text-display-lg-mobile lg:text-display-lg text-primary font-semibold tracking-tight">
            Order History
          </h1>
          <p className="font-body-lg text-on-surface-variant mt-2">
            Track previous artisanal brews, table experiences, and pastry orders.
          </p>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[1, 2].map((n) => (
              <div key={n} className="h-40 bg-surface-container rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-16 bg-surface-container-low rounded-3xl border border-surface-container space-y-3">
            <span className="material-symbols-outlined text-[48px] text-outline">local_cafe</span>
            <h3 className="font-headline-sm text-primary font-semibold">No orders yet</h3>
            <p className="text-body-sm text-on-surface-variant">
              When you order from our menu, your orders and receipts will appear here.
            </p>
            <Link
              to="/menu"
              className="mt-4 inline-block px-6 py-2.5 rounded-full bg-primary text-on-primary font-label-md font-semibold"
            >
              Explore Menu
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-surface-container-low p-6 rounded-2xl border border-surface-container shadow-sm space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-surface-container pb-3">
                  <div>
                    <span className="font-mono font-bold text-primary text-[15px]">{order.orderNumber}</span>
                    <span className="text-[12px] text-outline ml-3">
                      {new Date(order.createdAt).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[11px] font-bold">
                      {order.status}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-surface-container text-on-surface text-[11px] font-semibold">
                      {order.orderType}
                    </span>
                  </div>
                </div>

                {/* Items */}
                <div className="divide-y divide-surface-container/60 text-body-sm">
                  {order.items?.map((item) => (
                    <div key={item.id} className="py-2 flex justify-between">
                      <span className="text-primary">
                        {item.quantity} × {item.itemName}
                      </span>
                      <span className="text-secondary font-medium">₹{Number(item.subtotal).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-3 border-t border-surface-container text-body-sm">
                  <span className="text-on-surface-variant">Paid with {order.paymentMethod?.replace('_', ' ')}</span>
                  <span className="font-headline-sm text-primary font-bold">
                    Total: <span className="text-secondary">₹{Number(order.totalAmount).toFixed(2)}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
