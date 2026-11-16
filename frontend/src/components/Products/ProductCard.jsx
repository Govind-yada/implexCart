import React from 'react';
import { Star, Heart, ShoppingBag, Eye } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useLocalization } from '../../context/LocalizationContext';

const ProductCard = ({ product, onOpenModal }) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { formatPrice } = useLocalization();

  const isFavorited = isInWishlist(product.id);

  return (
    <div className="group bg-white rounded-xl border border-slate-200 overflow-hidden hover:border-blue-400 hover:shadow-lg transition-all duration-300 flex flex-col justify-between relative">
      
      {/* Top Image & Badges */}
      <div className="relative aspect-square w-full overflow-hidden bg-slate-50 p-4 flex items-center justify-center">
        
        {/* Promotional Badge */}
        {product.badge && (
          <span className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md shadow-xs z-10">
            {product.badge}
          </span>
        )}

        {/* Wishlist Heart Toggle */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id, product.name);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full shadow-md transition-all z-10 cursor-pointer ${
            isFavorited
              ? 'bg-red-50 text-red-600'
              : 'bg-white/90 text-slate-400 hover:text-red-500 hover:bg-white'
          }`}
          title={isFavorited ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-red-600 text-red-600' : ''}`} />
        </button>

        {/* Product Image */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-500 cursor-pointer"
          onClick={() => onOpenModal && onOpenModal(product)}
          loading="lazy"
        />

        {/* Quick View Hover Pill */}
        <button
          onClick={() => onOpenModal && onOpenModal(product)}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900/80 hover:bg-slate-900 text-white text-xs font-bold py-1.5 px-3 rounded-full flex items-center space-x-1 shadow-md cursor-pointer z-10"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Quick View</span>
        </button>
      </div>

      {/* Product Details */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Category */}
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
            {product.category}
          </span>

          {/* Title */}
          <h3
            onClick={() => onOpenModal && onOpenModal(product)}
            className="text-sm font-bold text-slate-900 line-clamp-2 hover:text-blue-700 transition-colors cursor-pointer mb-2"
          >
            {product.name}
          </h3>

          {/* Ratings & Reviews */}
          <div className="flex items-center space-x-1.5 mb-2.5">
            <div className="flex items-center text-amber-400">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
            </div>
            <span className="text-xs font-bold text-slate-800">{product.rating}</span>
            <span className="text-xs text-slate-400">({product.reviewsCount?.toLocaleString()})</span>
          </div>
        </div>

        {/* Pricing, Discount & Add to Cart */}
        <div>
          <div className="flex items-baseline space-x-2 mb-2">
            <span className="text-base sm:text-lg font-black text-slate-900">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-slate-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
            {product.discountPercent > 0 && (
              <span className="text-[11px] font-extrabold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                {product.discountPercent}% OFF
              </span>
            )}
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50/80 px-2 py-0.5 rounded">
              {product.shipping || 'Free Delivery'}
            </span>

            <button
              onClick={() => addToCart(product, 1, true)}
              className="flex items-center space-x-1.5 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold py-1.5 px-3 rounded-lg shadow-2xs hover:shadow-xs transition-all cursor-pointer"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};

export default ProductCard;
