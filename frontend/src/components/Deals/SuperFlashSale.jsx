import React, { useState, useEffect } from 'react';
import { Flame, Clock, Sparkles } from 'lucide-react';
import ProductCard from '../Products/ProductCard';

const SuperFlashSale = ({ products = [], onOpenProductModal }) => {
  // Live Countdown timer
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 15,
    minutes: 54,
    seconds: 40
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev;
        if (seconds > 0) {
          seconds--;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes--;
          } else {
            minutes = 59;
            if (hours > 0) {
              hours--;
            } else {
              hours = 23;
              if (days > 0) days--;
            }
          }
        }
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const flashProducts = products.filter(p => Array.isArray(p.featuredIn) && p.featuredIn.includes('flashSale'));

  const pad = (n) => String(n).padStart(2, '0');

  return (
    <section id="flash-sale" className="py-12 bg-[#fef2f2] border-b border-red-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Flash Sale Header with Live Timer */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 bg-white p-5 rounded-2xl border border-red-200 shadow-xs">
          
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-xl bg-red-600 text-white flex items-center justify-center animate-bounce">
              <Flame className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-black text-red-600 tracking-wider uppercase bg-red-50 border border-red-200 px-2 py-0.5 rounded">
                  Hurry Up!
                </span>
                <span className="text-xs font-semibold text-slate-500">Limited Stock Offers</span>
              </div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-0.5">
                Super Flash Sale
              </h2>
            </div>
          </div>

          {/* Countdown Clock Display */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="flex items-center text-xs font-bold text-red-700 mr-1 sm:mr-2">
              <Clock className="w-4 h-4 mr-1 text-red-600" />
              <span>Ends In:</span>
            </div>

            <div className="flex items-center space-x-1.5 sm:space-x-2">
              <div className="bg-red-600 text-white font-black text-sm sm:text-base px-2.5 py-1.5 rounded-lg text-center shadow-xs">
                <span>{pad(timeLeft.days)}</span>
                <span className="block text-[9px] font-semibold uppercase tracking-wider text-red-200">Days</span>
              </div>
              <span className="font-bold text-red-600">:</span>

              <div className="bg-red-600 text-white font-black text-sm sm:text-base px-2.5 py-1.5 rounded-lg text-center shadow-xs">
                <span>{pad(timeLeft.hours)}</span>
                <span className="block text-[9px] font-semibold uppercase tracking-wider text-red-200">Hrs</span>
              </div>
              <span className="font-bold text-red-600">:</span>

              <div className="bg-red-600 text-white font-black text-sm sm:text-base px-2.5 py-1.5 rounded-lg text-center shadow-xs">
                <span>{pad(timeLeft.minutes)}</span>
                <span className="block text-[9px] font-semibold uppercase tracking-wider text-red-200">Mins</span>
              </div>
              <span className="font-bold text-red-600">:</span>

              <div className="bg-red-600 text-white font-black text-sm sm:text-base px-2.5 py-1.5 rounded-lg text-center shadow-xs">
                <span>{pad(timeLeft.seconds)}</span>
                <span className="block text-[9px] font-semibold uppercase tracking-wider text-red-200">Secs</span>
              </div>
            </div>
          </div>

        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {(flashProducts.length > 0 ? flashProducts : products.slice(0, 4)).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onOpenModal={onOpenProductModal}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default SuperFlashSale;
