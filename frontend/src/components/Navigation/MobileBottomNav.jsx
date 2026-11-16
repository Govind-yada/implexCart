import React from 'react';
import { Home, Layers, Heart, ShoppingBag, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

const MobileBottomNav = ({ onSelectCategory, onOpenOrderHistory }) => {
  const { user, isAuthenticated, openAuthModal } = useAuth();
  const { cartCount, setIsCartOpen } = useCart();
  const { wishlistCount } = useWishlist();

  const handleHomeClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoriesClick = () => {
    const el = document.getElementById('categories');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleWishlistClick = () => {
    const target = document.getElementById('best-sellers') || document.getElementById('flash-sale');
    target?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleAccountClick = () => {
    if (isAuthenticated) {
      if (onOpenOrderHistory) onOpenOrderHistory();
    } else {
      openAuthModal('signin');
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 md:hidden shadow-[0_-2px_10px_rgba(0,0,0,0.06)] px-1 py-1.5 safe-area-bottom">
      <div className="grid grid-cols-5 items-center justify-around text-center">
        
        {/* Home */}
        <button
          onClick={handleHomeClick}
          className="flex flex-col items-center justify-center py-1 text-slate-600 hover:text-blue-700 active:scale-95 transition-all"
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] font-bold">Home</span>
        </button>

        {/* Categories */}
        <button
          onClick={handleCategoriesClick}
          className="flex flex-col items-center justify-center py-1 text-slate-600 hover:text-blue-700 active:scale-95 transition-all"
        >
          <Layers className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] font-bold">Categories</span>
        </button>

        {/* Wishlist */}
        <button
          onClick={handleWishlistClick}
          className="flex flex-col items-center justify-center py-1 text-slate-600 hover:text-red-600 active:scale-95 transition-all relative"
        >
          <div className="relative">
            <Heart className="w-5 h-5 mb-0.5" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-red-600 text-white text-[9px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-bold">Wishlist</span>
        </button>

        {/* Cart */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="flex flex-col items-center justify-center py-1 text-slate-600 hover:text-blue-700 active:scale-95 transition-all relative"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 mb-0.5" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-orange-500 text-white text-[9px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-bold">Cart</span>
        </button>

        {/* Login / Account */}
        <button
          onClick={handleAccountClick}
          className="flex flex-col items-center justify-center py-1 text-slate-600 hover:text-blue-700 active:scale-95 transition-all"
        >
          <User className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] font-bold truncate max-w-[55px]">
            {isAuthenticated ? (user?.name?.split(' ')[0] || 'Account') : 'Login'}
          </span>
        </button>

      </div>
    </div>
  );
};

export default MobileBottomNav;
