import React, { useState } from 'react';
import { X, Search, Truck, CheckCircle2, Clock, Package, MapPin, AlertCircle } from 'lucide-react';
import { api } from '../../services/api';
import { useLocalization } from '../../context/LocalizationContext';

const TrackOrderModal = ({ isOpen, onClose, initialOrderId = '' }) => {
  if (!isOpen) return null;

  const [orderId, setOrderId] = useState(initialOrderId || 'IMP-2026-8941');
  const [loading, setLoading] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const [error, setError] = useState('');
  const { formatPrice } = useLocalization();

  const handleTrack = async (e) => {
    if (e) e.preventDefault();
    if (!orderId.trim()) return;

    setLoading(true);
    setError('');
    setOrderData(null);

    try {
      const res = await api.trackOrder(orderId.trim());
      if (res.success && res.order) {
        setOrderData(res.order);
      } else {
        setError(res.error || 'Order not found. Please verify your Order ID.');
      }
    } catch (err) {
      setError('Unable to fetch tracking info at this time.');
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { title: 'Order Placed', desc: 'Verified & Accepted' },
    { title: 'Processing', desc: 'Packed & Quality Inspected' },
    { title: 'Shipped', desc: 'With Express Global Courier' },
    { title: 'Out for Delivery', desc: 'Courier on the way' },
    { title: 'Delivered', desc: 'Package delivered to doorstep' }
  ];

  const getStepIndex = (status) => {
    switch (status) {
      case 'Order Placed': return 0;
      case 'Processing': return 1;
      case 'Shipped': return 2;
      case 'Out for Delivery': return 3;
      case 'Delivered': return 4;
      default: return 1;
    }
  };

  const currentStep = orderData ? getStepIndex(orderData.orderStatus) : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col p-6 sm:p-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-900">Track Your Shipment</h2>
            <p className="text-xs text-slate-500">Real-time worldwide delivery milestones</p>
          </div>
        </div>

        {/* Search Input */}
        <form onSubmit={handleTrack} className="flex space-x-2 mb-6">
          <input
            type="text"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            placeholder="Enter Order ID (e.g. IMP-2026-8941)"
            className="flex-1 px-4 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-lg focus:border-blue-700 focus:outline-hidden font-bold"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs px-5 py-2.5 rounded-lg flex items-center space-x-1.5 transition-colors cursor-pointer disabled:opacity-50"
          >
            <Search className="w-4 h-4" />
            <span>{loading ? 'Locating...' : 'Track'}</span>
          </button>
        </form>

        {/* Error message */}
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 flex items-center space-x-2 mb-4">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Tracking Details */}
        {orderData && (
          <div className="overflow-y-auto space-y-6">
            
            {/* Status Summary */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-wrap justify-between items-center gap-3">
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase">Status</span>
                <p className="text-sm font-black text-blue-700">{orderData.orderStatus}</p>
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase">Carrier</span>
                <p className="text-xs font-semibold text-slate-800">Implex Global Express</p>
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase">Destination</span>
                <p className="text-xs font-semibold text-slate-800">
                  {orderData.shippingAddress?.city}, {orderData.shippingAddress?.country}
                </p>
              </div>
            </div>

            {/* Visual Milestones */}
            <div className="py-2">
              <div className="relative flex justify-between items-center">
                {/* Horizontal progress track line */}
                <div className="absolute top-4 left-6 right-6 h-1 bg-slate-200 -z-0">
                  <div
                    className="h-full bg-blue-700 transition-all duration-700"
                    style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
                  />
                </div>

                {steps.map((step, idx) => {
                  const isDone = idx <= currentStep;
                  return (
                    <div key={idx} className="flex flex-col items-center relative z-10 text-center flex-1">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                          isDone ? 'bg-blue-700 text-white shadow-md' : 'bg-slate-200 text-slate-500'
                        }`}
                      >
                        {isDone ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                      </div>
                      <span className={`text-[11px] font-bold mt-2 ${isDone ? 'text-slate-900' : 'text-slate-400'}`}>
                        {step.title}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Items in this shipment */}
            <div className="border-t border-slate-200 pt-4">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                Shipment Contents
              </h4>
              <div className="space-y-2">
                {orderData.items?.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs p-2 bg-slate-50 rounded-lg">
                    <div className="flex items-center space-x-2.5">
                      <img src={item.image} alt={item.name} className="w-8 h-8 object-contain rounded" />
                      <span className="font-semibold text-slate-800">{item.name} (x{item.quantity})</span>
                    </div>
                    <span className="font-bold text-slate-900">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default TrackOrderModal;
