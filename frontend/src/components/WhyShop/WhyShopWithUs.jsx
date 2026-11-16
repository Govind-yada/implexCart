import React from 'react';
import { Globe, Award, Tag, CreditCard, RefreshCw, LifeBuoy } from 'lucide-react';

const iconsMap = {
  Globe,
  Award,
  Tag,
  CreditCard,
  RefreshCw,
  LifeBuoy
};

const WhyShopWithUs = ({ features = [] }) => {
  const defaultFeatures = [
    { id: 1, title: "Global Shipping", description: "Delivering to 100+ Countries", icon: "Globe" },
    { id: 2, title: "Best Quality", description: "100% Genuine Products", icon: "Award" },
    { id: 3, title: "Best Prices", description: "Unbeatable Prices Everyday", icon: "Tag" },
    { id: 4, title: "Secure Payments", description: "Multiple Payment Options", icon: "CreditCard" },
    { id: 5, title: "Easy Returns", description: "Hassle Free Returns", icon: "RefreshCw" },
    { id: 6, title: "Customer Support", description: "24/7 Expert Support", icon: "LifeBuoy" }
  ];

  const activeFeatures = features.length > 0 ? features : defaultFeatures;

  return (
    <section className="py-14 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Why Shop with Implex Cart International?
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Built on trust, speed, and affordability for global consumers everywhere.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeFeatures.map((feat) => {
            const Icon = iconsMap[feat.icon] || Globe;
            return (
              <div
                key={feat.id || feat.title}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs hover:shadow-md hover:border-blue-300 transition-all flex items-start space-x-4"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{feat.title}</h3>
                  <p className="text-xs text-slate-500 mt-1">{feat.description}</p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default WhyShopWithUs;
