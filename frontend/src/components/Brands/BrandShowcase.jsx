import React from 'react';

const BrandShowcase = ({ brands = [], selectedBrand, onSelectBrand }) => {
  const brandList = brands.length > 0 ? brands : [
    { name: "Samsung" },
    { name: "boAt" },
    { name: "Puma" },
    { name: "Nike" },
    { name: "Philips" },
    { name: "Sony" },
    { name: "Apple" },
    { name: "Lenovo" }
  ];

  return (
    <section id="top-brands" className="py-12 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Shop by Top Brands
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              100% genuine products sourced directly from trusted global manufacturers
            </p>
          </div>
          {selectedBrand && (
            <button
              onClick={() => onSelectBrand('')}
              className="text-xs font-bold text-blue-700 bg-white border border-slate-200 px-3 py-1.5 rounded-md hover:bg-blue-50 transition-colors"
            >
              Clear Brand ({selectedBrand})
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {brandList.map((brand) => {
            const bName = typeof brand === 'string' ? brand : brand.name;
            const isSelected = selectedBrand === bName;

            return (
              <button
                key={bName}
                onClick={() => onSelectBrand(isSelected ? '' : bName)}
                className={`flex flex-col items-center justify-center p-4 rounded-xl border bg-white transition-all cursor-pointer ${
                  isSelected
                    ? 'border-blue-600 ring-2 ring-blue-600 shadow-md'
                    : 'border-slate-200 hover:border-blue-400 hover:shadow-md'
                }`}
              >
                <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center font-black text-slate-800 text-sm tracking-wider uppercase mb-2">
                  {bName.slice(0, 3)}
                </div>
                <span className="text-xs font-bold text-slate-800">
                  {bName}
                </span>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default BrandShowcase;
