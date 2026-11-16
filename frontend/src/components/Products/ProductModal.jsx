import React, { useState } from 'react';
import { X, Star, Heart, ShoppingBag, Zap, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useLocalization } from '../../context/LocalizationContext';

const ProductModal = ({ product, isOpen, onClose }) => {
  if (!isOpen || !product) return null;

  const [quantity, setQuantity] = useState(1);
  const { addToCart, proceedToCheckout } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { formatPrice } = useLocalization();

  const isFavorited = isInWishlist(product.id);

  const handleBuyNow = () => {
    addToCart(product, quantity, false);
    onClose();
    proceedToCheckout();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col md:flex-row">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors z-20 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Image Column */}
        <div className="md:w-1/2 bg-slate-50 p-6 flex items-center justify-center relative border-b md:border-b-0 md:border-r border-slate-200">
          {product.badge && (
            <span className="absolute top-4 left-4 bg-red-600 text-white text-[11px] font-extrabold uppercase px-2.5 py-1 rounded-md shadow-xs">
              {product.badge}
            </span>
          )}
          <img
            src={product.image}
            alt={product.name}
            className="max-h-72 w-full object-contain"
          />
        </div>

        {/* Content Column */}
        <div className="md:w-1/2 p-6 overflow-y-auto flex flex-col justify-between space-y-4">
          
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
                {product.category} {product.brand ? `• ${product.brand}` : ''}
              </span>
              <button
                onClick={() => toggleWishlist(product.id, product.name)}
                className={`p-2 rounded-full transition-colors ${
                  isFavorited ? 'text-red-600 bg-red-50' : 'text-slate-400 hover:text-red-500'
                }`}
              >
                <Heart className={`w-5 h-5 ${isFavorited ? 'fill-red-600' : ''}`} />
              </button>
            </div>

            <h2 className="text-xl font-black text-slate-900 mt-1 leading-snug">
              {product.name}
            </h2>

            {/* Rating */}
            <div className="flex items-center space-x-2 mt-2">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-amber-400' : 'text-slate-200'}`}
                  />
                ))}
              </div>
              <span className="text-xs font-bold text-slate-700">{product.rating}</span>
              <span className="text-xs text-slate-400">({product.reviewsCount?.toLocaleString()} verified ratings)</span>
            </div>

            {/* Price Box */}
            <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-200">
              <div className="flex items-baseline space-x-3">
                <span className="text-2xl font-black text-slate-900">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-slate-400 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                {product.discountPercent > 0 && (
                  <span className="text-xs font-extrabold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                    Save {product.discountPercent}%
                  </span>
                )}
              </div>
              <p className="text-[11px] text-emerald-700 font-semibold mt-1">
                ✓ Inclusive of all taxes • {product.shipping || 'Free Delivery'}
              </p>
            </div>

            {/* Description */}
            <div className="mt-4">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1">
                Description
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Specs Table */}
            {product.specs && (
              <div className="mt-3">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5">
                  Specifications
                </h4>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  {Object.entries(product.specs).map(([k, v]) => (
                    <div key={k} className="bg-slate-50 p-2 rounded border border-slate-100">
                      <span className="text-slate-400 block">{k}</span>
                      <span className="font-semibold text-slate-800">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Quantity & CTA Buttons */}
          <div className="pt-4 border-t border-slate-200 space-y-3">
            <div className="flex items-center space-x-4">
              <span className="text-xs font-bold text-slate-700">Quantity:</span>
              <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  -
                </button>
                <span className="px-4 py-1.5 text-xs font-bold text-slate-900 border-x border-slate-200">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  +
                </button>
              </div>
              <span className="text-xs font-semibold text-emerald-600">
                In Stock ({product.stockCount || 45} units)
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => {
                  addToCart(product, quantity, true);
                  onClose();
                }}
                className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs py-3 rounded-lg shadow-xs flex items-center justify-center space-x-2 transition-all cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Cart</span>
              </button>

              <button
                onClick={handleBuyNow}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs py-3 rounded-lg shadow-xs flex items-center justify-center space-x-2 transition-all cursor-pointer"
              >
                <Zap className="w-4 h-4" />
                <span>Buy Now</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ProductModal;
