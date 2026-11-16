import React from 'react';

const AnnouncementBar = ({ announcements = [] }) => {
  const items = announcements.length > 0 ? announcements : [
    "✨ Har Ghar Ki Smart Shopping ✨",
    "🚚 Free Shipping Above ₹499",
    "🔥 7 Days Return",
    "💳 Secure Payment"
  ];

  return (
    <div className="bg-[#1e3a8a] text-white py-1.5 px-4 text-xs font-medium overflow-hidden border-b border-blue-950">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="relative w-full overflow-hidden whitespace-nowrap">
          <div className="animate-marquee flex items-center space-x-12">
            {[...items, ...items, ...items, ...items].map((text, idx) => (
              <span key={idx} className="inline-flex items-center tracking-wide text-blue-100">
                {text}
                <span className="mx-6 text-blue-400">|</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBar;
