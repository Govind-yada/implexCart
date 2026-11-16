import React from 'react';
import { Star, CheckCircle, Quote } from 'lucide-react';

const CustomerReviews = ({ reviews = [] }) => {
  const defaultReviews = [
    {
      id: "rev-1",
      date: "July 12, 2026",
      author: "Rohan K.",
      initial: "R",
      rating: 5,
      verified: true,
      product: "Pro Wireless Earbuds",
      comment: "Absolutely outstanding quality. The delivery was incredibly fast and the customer support team guided me through the setup perfectly. Will definitely shop again!"
    },
    {
      id: "rev-2",
      date: "July 08, 2026",
      author: "Anjali S.",
      initial: "A",
      rating: 5,
      verified: true,
      product: "Smart Watch Series 7",
      comment: "This smartwatch exceeded all my expectations. The health tracking features are very accurate and the battery easily lasts 5 days. High-end build quality!"
    },
    {
      id: "rev-3",
      date: "June 28, 2026",
      author: "David W.",
      initial: "D",
      rating: 5,
      verified: true,
      product: "Mirrorless Camera 4K",
      comment: "Outstanding picture quality and depth. Implex Cart provided a seamless checkout experience. The mirrorless camera has transformed my travel photography."
    }
  ];

  const activeReviews = reviews.length > 0 ? reviews : defaultReviews;

  return (
    <section className="py-14 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full mb-2">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>4.9 / 5 Overall Rating from 4,500+ Verified Buyers</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              What Our Global Shoppers Say
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Authentic feedback from real buyers who trust Implex Cart everyday
            </p>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {activeReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-slate-50 rounded-2xl p-6 border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Rating Stars & Date */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < (rev.rating || 5) ? 'fill-amber-400' : 'text-slate-300'}`}
                      />
                    ))}
                  </div>
                  <span className="text-[11px] text-slate-400">{rev.date}</span>
                </div>

                {/* Comment */}
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic mb-4">
                  "{rev.comment}"
                </p>
              </div>

              {/* Author & Product Info */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-full bg-blue-700 text-white font-bold text-xs flex items-center justify-center">
                    {rev.initial || rev.author?.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center space-x-1">
                      <span className="text-xs font-bold text-slate-900">{rev.author}</span>
                      {rev.verified && (
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600" title="Verified Buyer" />
                      )}
                    </div>
                    <span className="text-[11px] text-slate-400 block truncate max-w-[170px]">
                      Verified purchase of {rev.product}
                    </span>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default CustomerReviews;
