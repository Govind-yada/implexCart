import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles } from 'lucide-react';

const HeroSlider = ({ slides = [] }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const defaultSlides = [
    {
      id: "hero-1",
      badge: "SHOP GLOBAL, SAVE MORE",
      title: "Discover Global Products at Best Prices",
      subtitle: "Top Quality • Best Deals • Fast Delivery",
      ctaText: "Shop Now",
      ctaLink: "#categories",
      promoBadge: "BIG SAVINGS UP TO 70% OFF",
      image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&auto=format&fit=crop&q=80"
    },
    {
      id: "hero-2",
      badge: "NEW SEASON ARRIVALS",
      title: "Latest Tech, Unbeatable Prices",
      subtitle: "Smartphones • Wearables • Audio gear",
      ctaText: "Explore Deals",
      ctaLink: "#flash-sale",
      promoBadge: "FRESH DROPS EVERY WEEK",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&auto=format&fit=crop&q=80"
    }
  ];

  const activeSlides = slides.length > 0 ? slides : defaultSlides;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % activeSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [activeSlides.length]);

  const prev = () => setCurrentSlide((prev) => (prev - 1 + activeSlides.length) % activeSlides.length);
  const next = () => setCurrentSlide((prev) => (prev + 1) % activeSlides.length);

  const slide = activeSlides[currentSlide] || activeSlides[0];

  return (
    <div className="relative bg-[#eef5fc] overflow-hidden border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[380px]">
          
          {/* Content Column */}
          <div className="lg:col-span-7 space-y-4 text-left z-10">
            {/* Promo Pill */}
            <div className="inline-flex items-center space-x-2 bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase border border-orange-200">
              <Sparkles className="w-3.5 h-3.5 text-orange-600" />
              <span>{slide.badge}</span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              {slide.title}
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-lg text-slate-600 font-medium">
              {slide.subtitle}
            </p>

            {/* CTA + Promo */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href={slide.ctaLink}
                className="inline-flex items-center space-x-2 bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm px-7 py-3 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                <span>{slide.ctaText}</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <span className="inline-flex items-center text-xs font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-3 py-1.5 rounded-md">
                🔥 {slide.promoBadge}
              </span>
            </div>
          </div>

          {/* Image Column */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            <div className="relative w-full max-w-md h-64 sm:h-80 rounded-2xl overflow-hidden shadow-xl border-4 border-white bg-white group">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent"></div>
            </div>
          </div>

        </div>
      </div>

      {/* Slider Arrow Controls */}
      <button
        onClick={prev}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-slate-800 p-2.5 rounded-full shadow-md hover:shadow-lg transition-all z-20 cursor-pointer"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={next}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-slate-800 p-2.5 rounded-full shadow-md hover:shadow-lg transition-all z-20 cursor-pointer"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
        {activeSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`w-3 h-3 rounded-full transition-all cursor-pointer ${
              i === currentSlide ? 'bg-blue-700 w-8' : 'bg-slate-300 hover:bg-slate-400'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
