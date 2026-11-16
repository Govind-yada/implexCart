import React from 'react';
import { ArrowRight } from 'lucide-react';

const CategoryGrid = ({ categories = [], selectedCategory, onSelectCategory }) => {
  return (
    <section id="categories" className="py-12 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Shop by Category
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Explore global quality across all everyday categories
            </p>
          </div>
          {selectedCategory && (
            <button
              onClick={() => onSelectCategory('')}
              className="text-xs font-bold text-blue-700 hover:text-blue-800 bg-blue-50 px-3 py-1.5 rounded-md transition-colors cursor-pointer"
            >
              Clear Filter
            </button>
          )}
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-3 sm:gap-4">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.slug || selectedCategory === cat.name;
            return (
              <button
                key={cat.id || cat.slug}
                onClick={() => onSelectCategory(cat.slug || cat.name)}
                className={`group flex flex-col items-center p-3 rounded-xl border text-center transition-all cursor-pointer ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50/50 shadow-xs ring-2 ring-blue-600'
                    : 'border-slate-200 hover:border-blue-400 hover:shadow-md bg-white'
                }`}
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden bg-slate-100 mb-2.5 p-1 border border-slate-200 group-hover:scale-105 transition-transform duration-300">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover rounded-full"
                    loading="lazy"
                  />
                </div>
                <span className={`text-xs font-bold leading-tight group-hover:text-blue-700 transition-colors ${
                  isSelected ? 'text-blue-700 font-extrabold' : 'text-slate-800'
                }`}>
                  {cat.name}
                </span>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default CategoryGrid;
