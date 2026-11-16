import React, { useState } from 'react';
import { Menu, ChevronDown, Sparkles, Flame, Tag, Layers, Truck, Store } from 'lucide-react';

const NavBar = ({ categories = [], onSelectCategory, onOpenTrackOrder, onOpenBecomeSeller }) => {
  const [catMenuOpen, setCatMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-slate-200 text-xs font-semibold text-slate-700 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-11">
          
          {/* Left Navigation Group */}
          <div className="flex items-center space-x-1 sm:space-x-4">
            
            {/* All Categories Dropdown Pill */}
            <div className="relative">
              <button
                onClick={() => setCatMenuOpen(!catMenuOpen)}
                className="flex items-center space-x-2 bg-blue-700 hover:bg-blue-800 text-white px-3.5 py-1.5 rounded-md font-bold text-xs transition-colors cursor-pointer"
              >
                <Menu className="w-3.5 h-3.5" />
                <span>All Categories</span>
                <ChevronDown className="w-3 h-3 ml-0.5" />
              </button>

              {catMenuOpen && (
                <div
                  className="absolute left-0 mt-1 w-56 bg-white border border-slate-200 rounded-lg shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2"
                  onClick={() => setCatMenuOpen(false)}
                >
                  <button
                    onClick={() => onSelectCategory('')}
                    className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-800 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                  >
                    All Departments
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.id || cat.slug}
                      onClick={() => onSelectCategory(cat.slug || cat.name)}
                      className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors flex items-center justify-between"
                    >
                      <span>{cat.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Links */}
            <div className="hidden md:flex items-center space-x-6 text-slate-700">
              <a href="#" className="hover:text-blue-700 transition-colors py-2 border-b-2 border-transparent hover:border-blue-700">
                Home
              </a>
              <a href="#categories" className="hover:text-blue-700 transition-colors py-2">
                Shop
              </a>
              <a href="#flash-sale" className="hover:text-red-600 transition-colors py-2 flex items-center space-x-1 text-red-600">
                <Flame className="w-3.5 h-3.5" />
                <span>Deals</span>
              </a>
              <a href="#new-arrivals" className="hover:text-blue-700 transition-colors py-2 flex items-center space-x-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>New Arrivals</span>
              </a>
              <a href="#best-sellers" className="hover:text-blue-700 transition-colors py-2">
                Best Sellers
              </a>
              <a href="#top-brands" className="hover:text-blue-700 transition-colors py-2">
                Brands
              </a>
              <button
                onClick={onOpenTrackOrder}
                className="hover:text-blue-700 transition-colors py-2 flex items-center space-x-1 cursor-pointer font-semibold text-slate-700"
              >
                <Truck className="w-3.5 h-3.5 text-blue-600" />
                <span>Track Order</span>
              </button>
            </div>

          </div>

          {/* Right Pillar: Become a Seller */}
          <div className="flex items-center">
            <button
              onClick={onOpenBecomeSeller}
              className="flex items-center space-x-1.5 text-emerald-600 hover:text-emerald-700 font-bold text-xs py-1 px-3 rounded-full hover:bg-emerald-50 transition-colors cursor-pointer border border-emerald-200"
            >
              <Store className="w-3.5 h-3.5 text-emerald-600" />
              <span>Become a Seller</span>
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default NavBar;
