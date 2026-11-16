import React, { useState } from 'react';
import { Search, User, Heart, ShoppingBag, Globe, ChevronDown, LogOut, PackageCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useLocalization } from '../../context/LocalizationContext';

const MainHeader = ({
  categories = [],
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  onOpenOrderHistory
}) => {
  const { user, isAuthenticated, openAuthModal, logout } = useAuth();
  const { cartCount, cartSubtotal, setIsCartOpen } = useCart();
  const { wishlistCount } = useWishlist();
  const { currency, setCurrency, formatPrice, currenciesData, language, setLanguage, languagesData } = useLocalization();
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex items-center justify-between gap-4">
          
          {/* Logo & Tagline */}
          <a href="#" className="flex-shrink-0 flex flex-col group">
            <div className="flex items-center space-x-1">
              <span className="text-2xl font-black tracking-tight text-orange-500 font-sans">IMPLEX</span>
              <span className="text-2xl font-black tracking-tight text-slate-800">CART</span>
              <span className="text-xs font-semibold text-slate-400 self-end mb-1 ml-1 tracking-wider uppercase">INTERNATIONAL</span>
            </div>
            <span className="text-[11px] font-bold text-orange-500 tracking-wider uppercase -mt-1 group-hover:text-orange-600 transition-colors">
              Har Ghar Ki Smart Shopping
            </span>
          </a>

          {/* Search Group (Category Select + Input + Button) */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (onSearchSubmit) onSearchSubmit();
            }}
            className="hidden md:flex flex-1 max-w-2xl items-center border border-slate-300 rounded-lg overflow-hidden focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 transition-all bg-white"
          >
            <div className="relative border-r border-slate-200 bg-slate-50">
              <select
                value={selectedCategory}
                onChange={(e) => onSelectCategory(e.target.value)}
                className="w-36 py-2.5 pl-3 pr-8 text-xs font-medium text-slate-700 bg-transparent border-none focus:outline-hidden cursor-pointer"
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat.id || cat.slug} value={cat.slug || cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search products, brands and more..."
              className="flex-1 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden"
            />

            <button
              type="submit"
              className="bg-blue-700 hover:bg-blue-800 text-white px-5 py-2.5 flex items-center justify-center transition-colors cursor-pointer"
              title="Search"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>

          {/* Action Icons & Controls */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            
            {/* Currency & Language Switcher */}
            <div className="hidden lg:flex items-center space-x-2 text-xs font-semibold text-slate-600 border border-slate-200 rounded-md px-2.5 py-1.5 bg-slate-50">
              <Globe className="w-3.5 h-3.5 text-slate-500" />
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="bg-transparent border-none focus:outline-hidden font-bold text-slate-800 cursor-pointer text-xs"
              >
                {Object.values(currenciesData).map((curr) => (
                  <option key={curr.code} value={curr.code}>
                    {curr.code} ({curr.symbol})
                  </option>
                ))}
              </select>

              <span className="text-slate-300">|</span>

              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-transparent border-none focus:outline-hidden text-slate-700 cursor-pointer text-xs"
              >
                {languagesData.map((l) => (
                  <option key={l.code} value={l.code}>
                    {l.name}
                  </option>
                ))}
              </select>
            </div>

            {/* User Account Button */}
            <div className="relative">
              {isAuthenticated ? (
                <div>
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center space-x-1.5 text-xs font-semibold text-slate-800 hover:text-blue-700 py-1.5 px-2 rounded-md hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-xs">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="hidden sm:inline max-w-[90px] truncate">{user.name.split(' ')[0]}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                  </button>

                  {userDropdownOpen && (
                    <div
                      className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-lg shadow-lg py-1.5 z-50"
                      onClick={() => setUserDropdownOpen(false)}
                    >
                      <div className="px-4 py-2 border-b border-slate-100">
                        <p className="text-xs font-bold text-slate-900">{user.name}</p>
                        <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                      </div>
                      <button
                        onClick={onOpenOrderHistory}
                        className="w-full text-left px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center space-x-2"
                      >
                        <PackageCheck className="w-4 h-4 text-slate-500" />
                        <span>My Orders</span>
                      </button>
                      <button
                        onClick={logout}
                        className="w-full text-left px-4 py-2 text-xs font-medium text-red-600 hover:bg-red-50 flex items-center space-x-2"
                      >
                        <LogOut className="w-4 h-4 text-red-500" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => openAuthModal('signin')}
                  className="flex items-center space-x-1.5 text-xs font-semibold text-slate-700 hover:text-blue-700 py-1.5 px-2.5 rounded-md hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <User className="w-5 h-5 text-slate-600" />
                  <span className="hidden sm:inline">Login / Register</span>
                </button>
              )}
            </div>

            {/* Wishlist Button */}
            <a
              href="#wishlist"
              onClick={(e) => {
                e.preventDefault();
                // scroll to trending or favorites
                const target = document.getElementById('best-sellers') || document.getElementById('flash-sale');
                target?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="relative p-2 text-slate-700 hover:text-red-600 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
              title="View Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                  {wishlistCount}
                </span>
              )}
            </a>

            {/* Cart Button with Total */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center space-x-2 bg-blue-700 hover:bg-blue-800 text-white px-3.5 py-2 rounded-lg font-bold text-xs shadow-xs transition-colors cursor-pointer"
              title="Open Shopping Cart"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline font-bold">
                {formatPrice(cartSubtotal)}
              </span>
            </button>

          </div>
        </div>

        {/* Mobile Search Row */}
        <div className="mt-3 md:hidden">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (onSearchSubmit) onSearchSubmit();
            }}
            className="flex items-center border border-slate-300 rounded-lg overflow-hidden bg-white"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search products..."
              className="flex-1 px-3 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-hidden"
            />
            <button
              type="submit"
              className="bg-blue-700 text-white px-4 py-2 flex items-center justify-center cursor-pointer"
            >
              <Search className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

      </div>
    </header>
  );
};

export default MainHeader;
