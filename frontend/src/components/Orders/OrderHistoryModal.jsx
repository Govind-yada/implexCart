import React, { useState, useEffect } from 'react';
import { X, PackageCheck, Truck, Clock } from 'lucide-react';
import { api } from '../../services/api';
import { useLocalization } from '../../context/LocalizationContext';

const OrderHistoryModal = ({ isOpen, onClose, onTrackOrder }) => {
  if (!isOpen) return null;

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { formatPrice } = useLocalization();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.getMyOrders();
        if (res.success && res.orders) {
          setOrders(res.orders);
        }
      } catch (e) {
        console.error('Failed to load orders:', e);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col p-6 sm:p-8">
        
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
            <PackageCheck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-900">Your Order History</h2>
            <p className="text-xs text-slate-500">Track and review all your purchases</p>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1">
          {loading ? (
            <p className="text-xs text-slate-500 text-center py-8">Loading your orders...</p>
          ) : orders.length === 0 ? (
            <div className="text-center py-12 text-slate-500 space-y-2">
              <Clock className="w-8 h-8 text-slate-300 mx-auto" />
              <p className="text-sm font-bold text-slate-700">No orders placed yet</p>
              <p className="text-xs text-slate-400">Your completed purchases will appear here.</p>
            </div>
          ) : (
            orders.map((order) => (
              <div key={order.orderId} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-200 text-xs">
                  <div>
                    <span className="text-slate-400">Order ID: </span>
                    <span className="font-black text-slate-900">{order.orderId}</span>
                    <span className="ml-3 text-[11px] text-slate-400">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="bg-blue-100 text-blue-800 text-[11px] font-bold px-2 py-0.5 rounded">
                      {order.orderStatus}
                    </span>
                    <button
                      onClick={() => {
                        onClose();
                        if (onTrackOrder) onTrackOrder(order.orderId);
                      }}
                      className="bg-blue-700 hover:bg-blue-800 text-white text-[11px] font-bold px-2.5 py-1 rounded flex items-center space-x-1 cursor-pointer"
                    >
                      <Truck className="w-3 h-3" />
                      <span>Track</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5">
                  {order.items?.map((it, i) => (
                    <div key={i} className="flex items-center justify-between text-xs">
                      <span className="text-slate-700 font-medium">
                        {it.name} <span className="text-slate-400">x{it.quantity}</span>
                      </span>
                      <span className="font-bold text-slate-900">
                        {formatPrice(it.price * it.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-slate-200 text-xs">
                  <span className="text-slate-500">Shipped to: {order.shippingAddress?.fullName}, {order.shippingAddress?.city}</span>
                  <span className="font-black text-slate-900 text-sm">
                    Total: {formatPrice(order.pricing?.total)}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};

export default OrderHistoryModal;
