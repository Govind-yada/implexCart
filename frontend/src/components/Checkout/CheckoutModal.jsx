import React, { useState } from 'react';
import { X, CheckCircle, ShieldCheck, CreditCard, Smartphone, Banknote, Building2, Truck, ArrowRight, Tag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useLocalization } from '../../context/LocalizationContext';
import { api } from '../../services/api';

const CheckoutModal = ({ onOrderSuccess }) => {
  const {
    isCheckoutModalOpen,
    setIsCheckoutModalOpen,
    cartItems,
    cartSubtotal,
    clearCart
  } = useCart();
  const { user, showToast } = useAuth();
  const { formatPrice, currency } = useLocalization();

  const [address, setAddress] = useState({
    fullName: user?.name || '',
    street: user?.addresses?.[0]?.street || '101 Global Square, Tech Park Road',
    city: user?.addresses?.[0]?.city || 'Mumbai',
    state: user?.addresses?.[0]?.state || 'Maharashtra',
    zipCode: user?.addresses?.[0]?.zipCode || '400001',
    phone: user?.phone || '+91 98765 43210',
    country: 'India'
  });

  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi' | 'card' | 'netbanking' | 'cod'
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);

  if (!isCheckoutModalOpen) return null;

  const shippingFee = cartSubtotal > 10 ? 0 : 2;
  const finalTotal = Math.max(0, cartSubtotal - appliedDiscount + shippingFee);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (code === 'SAVE10' || code === 'IMPLEX10') {
      const disc = cartSubtotal * 0.10;
      setAppliedDiscount(disc);
      showToast('Coupon applied! 10% discount added.', 'success');
    } else if (code === 'GLOBAL20') {
      const disc = cartSubtotal * 0.20;
      setAppliedDiscount(disc);
      showToast('Coupon applied! 20% discount added.', 'success');
    } else {
      showToast('Invalid promo code. Try "SAVE10"', 'warning');
    }
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!address.fullName || !address.street || !address.city || !address.zipCode) {
      showToast('Please fill in all shipping address fields.', 'warning');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        items: cartItems.map(item => ({
          productId: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image
        })),
        shippingAddress: address,
        paymentMethod,
        currency
      };

      const res = await api.createOrder(payload);
      if (res.success && res.order) {
        setCompletedOrder(res.order);
        clearCart();
        showToast('Order placed successfully!', 'success');
        if (onOrderSuccess) onOrderSuccess(res.order);
      } else {
        showToast(res.error || 'Failed to place order.', 'error');
      }
    } catch (err) {
      console.error('Order error:', err);
      showToast('An unexpected error occurred while placing your order.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setIsCheckoutModalOpen(false);
    setCompletedOrder(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <h2 className="text-base font-black text-slate-900">
              {completedOrder ? 'Order Confirmed!' : 'Secure Checkout'}
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        {completedOrder ? (
          <div className="p-8 text-center space-y-5 overflow-y-auto">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle className="w-9 h-9" />
            </div>

            <div className="space-y-1">
              <h3 className="text-2xl font-black text-slate-900">Thank You for Shopping!</h3>
              <p className="text-xs sm:text-sm text-slate-500">
                Your order has been placed and is being prepared for dispatch.
              </p>
            </div>

            {/* Order Card */}
            <div className="max-w-md mx-auto p-4 bg-slate-50 rounded-xl border border-slate-200 text-left space-y-2.5 text-xs">
              <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                <span className="font-bold text-slate-500">Order ID:</span>
                <span className="font-black text-blue-700 text-sm">{completedOrder.orderId}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Delivery Address:</span>
                <span className="font-semibold text-slate-800 text-right">
                  {completedOrder.shippingAddress?.fullName}, {completedOrder.shippingAddress?.city}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Payment Method:</span>
                <span className="font-semibold text-slate-800 uppercase">{completedOrder.paymentMethod}</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-slate-200 font-bold">
                <span>Total Paid:</span>
                <span className="text-sm font-black text-slate-900">
                  {formatPrice(completedOrder.pricing?.total)}
                </span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap justify-center gap-3">
              <button
                onClick={handleClose}
                className="bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs px-6 py-3 rounded-lg shadow-xs"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-12 gap-8">
            
            {/* Left: Shipping & Payment Form */}
            <form onSubmit={handlePlaceOrder} className="md:col-span-7 space-y-6">
              
              {/* Shipping Address */}
              <div>
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-3 flex items-center space-x-1.5">
                  <Truck className="w-4 h-4 text-blue-700" />
                  <span>1. Shipping Address</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={address.fullName}
                      onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                      placeholder="Receiver's name"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:border-blue-600 focus:outline-hidden"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Street Address</label>
                    <input
                      type="text"
                      required
                      value={address.street}
                      onChange={(e) => setAddress({ ...address, street: e.target.value })}
                      placeholder="Flat, building, street, area"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:border-blue-600 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">City</label>
                    <input
                      type="text"
                      required
                      value={address.city}
                      onChange={(e) => setAddress({ ...address, city: e.target.value })}
                      placeholder="City"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:border-blue-600 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">State</label>
                    <input
                      type="text"
                      required
                      value={address.state}
                      onChange={(e) => setAddress({ ...address, state: e.target.value })}
                      placeholder="State"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:border-blue-600 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Postal / Pin Code</label>
                    <input
                      type="text"
                      required
                      value={address.zipCode}
                      onChange={(e) => setAddress({ ...address, zipCode: e.target.value })}
                      placeholder="Pin code"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:border-blue-600 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={address.phone}
                      onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                      placeholder="Mobile number for delivery updates"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:border-blue-600 focus:outline-hidden"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-3 flex items-center space-x-1.5">
                  <CreditCard className="w-4 h-4 text-blue-700" />
                  <span>2. Select Payment Method</span>
                </h3>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <label className={`flex items-center space-x-2.5 p-3 rounded-xl border cursor-pointer transition-all ${
                    paymentMethod === 'upi' ? 'border-blue-600 bg-blue-50/60 font-bold' : 'border-slate-200 hover:border-slate-300'
                  }`}>
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'upi'}
                      onChange={() => setPaymentMethod('upi')}
                      className="text-blue-600"
                    />
                    <Smartphone className="w-4 h-4 text-emerald-600" />
                    <span>Instant UPI / QR</span>
                  </label>

                  <label className={`flex items-center space-x-2.5 p-3 rounded-xl border cursor-pointer transition-all ${
                    paymentMethod === 'card' ? 'border-blue-600 bg-blue-50/60 font-bold' : 'border-slate-200 hover:border-slate-300'
                  }`}>
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                      className="text-blue-600"
                    />
                    <CreditCard className="w-4 h-4 text-blue-600" />
                    <span>Credit / Debit Card</span>
                  </label>

                  <label className={`flex items-center space-x-2.5 p-3 rounded-xl border cursor-pointer transition-all ${
                    paymentMethod === 'netbanking' ? 'border-blue-600 bg-blue-50/60 font-bold' : 'border-slate-200 hover:border-slate-300'
                  }`}>
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'netbanking'}
                      onChange={() => setPaymentMethod('netbanking')}
                      className="text-blue-600"
                    />
                    <Building2 className="w-4 h-4 text-purple-600" />
                    <span>Net Banking</span>
                  </label>

                  <label className={`flex items-center space-x-2.5 p-3 rounded-xl border cursor-pointer transition-all ${
                    paymentMethod === 'cod' ? 'border-blue-600 bg-blue-50/60 font-bold' : 'border-slate-200 hover:border-slate-300'
                  }`}>
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="text-blue-600"
                    />
                    <Banknote className="w-4 h-4 text-amber-600" />
                    <span>Cash on Delivery</span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm py-3.5 rounded-xl shadow-md hover:shadow-lg flex items-center justify-center space-x-2 transition-all cursor-pointer disabled:opacity-50"
              >
                <span>{loading ? 'Processing Order...' : `Pay & Place Order • ${formatPrice(finalTotal)}`}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </form>

            {/* Right: Order Summary & Coupon */}
            <div className="md:col-span-5 bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                Order Summary ({cartItems.length} items)
              </h3>

              {/* Items Mini List */}
              <div className="max-h-48 overflow-y-auto space-y-2.5 pr-1">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3 text-xs bg-white p-2 rounded-lg border border-slate-200">
                    <img src={item.image} alt={item.name} className="w-10 h-10 object-contain rounded" />
                    <div className="flex-1 truncate">
                      <p className="font-bold text-slate-800 truncate">{item.name}</p>
                      <p className="text-[11px] text-slate-400">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-bold text-slate-900">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Coupon Form */}
              <div className="pt-2 border-t border-slate-200">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Coupon: SAVE10"
                    className="flex-1 px-3 py-1.5 text-xs border border-slate-300 rounded-lg uppercase font-bold focus:border-blue-600 focus:outline-hidden"
                  />
                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    className="bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
              </div>

              {/* Calculations */}
              <div className="pt-3 border-t border-slate-200 space-y-2 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal:</span>
                  <span className="font-semibold text-slate-800">{formatPrice(cartSubtotal)}</span>
                </div>

                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Coupon Discount:</span>
                    <span>-{formatPrice(appliedDiscount)}</span>
                  </div>
                )}

                <div className="flex justify-between text-slate-600">
                  <span>Shipping:</span>
                  <span className="font-semibold text-emerald-600">
                    {shippingFee === 0 ? 'FREE' : formatPrice(shippingFee)}
                  </span>
                </div>

                <div className="flex justify-between text-base font-black text-slate-900 pt-2 border-t border-slate-200">
                  <span>Total Amount:</span>
                  <span>{formatPrice(finalTotal)}</span>
                </div>
              </div>

              <div className="text-[11px] text-slate-400 text-center flex items-center justify-center space-x-1 pt-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>256-Bit Bank Grade SSL Encryption</span>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default CheckoutModal;
