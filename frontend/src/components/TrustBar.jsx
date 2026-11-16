import React from 'react';
import { Truck, ShieldCheck, RotateCcw, Headphones } from 'lucide-react';

const TrustBar = () => {
  const pillars = [
    { title: "Free Delivery", subtitle: "On orders above ₹499", icon: Truck },
    { title: "100% Secure Payment", subtitle: "Safe and encrypted checkout", icon: ShieldCheck },
    { title: "Easy Returns", subtitle: "7 days hassle-free return", icon: RotateCcw },
    { title: "24/7 Support", subtitle: "Dedicated global assistance", icon: Headphones }
  ];

  return (
    <div className="bg-white border-b border-slate-200 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex items-center space-x-3.5 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                <div className="w-11 h-11 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">{item.title}</h4>
                  <p className="text-[11px] sm:text-xs text-slate-500">{item.subtitle}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TrustBar;
