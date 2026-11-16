import React from 'react';
import { Mail, Phone, MapPin, Globe, User, PackageCheck } from 'lucide-react';
import { useLocalization } from '../../context/LocalizationContext';
import { useAuth } from '../../context/AuthContext';

const Footer = ({ onOpenInfoModal, onOpenTrackOrder, onOpenBecomeSeller, onOpenOrderHistory }) => {
  const { currency, setCurrency, currenciesData, language, setLanguage, languagesData } = useLocalization();
  const { user, isAuthenticated, openAuthModal } = useAuth();

  const handleLinkClick = (e, topic) => {
    e.preventDefault();
    if (topic === 'track') {
      if (onOpenTrackOrder) onOpenTrackOrder();
    } else if (topic === 'seller') {
      if (onOpenBecomeSeller) onOpenBecomeSeller();
    } else if (topic === 'account') {
      if (isAuthenticated) {
        if (onOpenOrderHistory) onOpenOrderHistory();
      } else {
        openAuthModal('signin');
      }
    } else if (topic === 'login') {
      openAuthModal('signin');
    } else if (onOpenInfoModal) {
      onOpenInfoModal(topic);
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800 pb-20 md:pb-0">
      
      {/* 4-Column Main Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14">
        
        {/* Mobile Quick Action Buttons in Footer */}
        <div className="md:hidden grid grid-cols-2 gap-3 pb-8 mb-8 border-b border-slate-800">
          <button
            onClick={() => {
              if (isAuthenticated) {
                if (onOpenOrderHistory) onOpenOrderHistory();
              } else {
                openAuthModal('signin');
              }
            }}
            className="flex items-center justify-center space-x-2 bg-slate-800 hover:bg-slate-700 text-white p-3 rounded-xl border border-slate-700 font-bold text-xs transition-colors"
          >
            <User className="w-4 h-4 text-orange-500" />
            <span>{isAuthenticated ? 'My Account' : 'Login / Register'}</span>
          </button>

          <button
            onClick={() => {
              if (onOpenTrackOrder) onOpenTrackOrder();
            }}
            className="flex items-center justify-center space-x-2 bg-slate-800 hover:bg-slate-700 text-white p-3 rounded-xl border border-slate-700 font-bold text-xs transition-colors"
          >
            <PackageCheck className="w-4 h-4 text-blue-400" />
            <span>Track My Order</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          
          {/* Column 1: Brand & Contact Info */}
          <div className="space-y-4">
            <div>
              <div className="flex items-center space-x-1">
                <span className="text-xl font-black text-orange-500">IMPLEX</span>
                <span className="text-xl font-black text-white">CART</span>
                <span className="text-[10px] font-bold text-slate-500 ml-1">INTERNATIONAL</span>
              </div>
              <p className="text-[11px] font-bold text-orange-500 tracking-wider uppercase mt-0.5">
                Har Ghar Ki Smart Shopping
              </p>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Your global marketplace for quality products at unbeatable prices. Delivering happiness to 100+ countries since 2025.
            </p>

            <div className="space-y-2 pt-1 text-slate-300">
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                <span>123 Global Trade Center, New York, USA</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-orange-500 flex-shrink-0" />
                <a href="mailto:support@implexcart.com" className="hover:text-white transition-colors">
                  support@implexcart.com
                </a>
              </div>
              <div className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-orange-500 flex-shrink-0" />
                <a href="tel:+18005550199" className="hover:text-white transition-colors">
                  +1 (800) 555-0199
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-black text-white uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#account" onClick={(e) => handleLinkClick(e, 'account')} className="hover:text-white transition-colors flex items-center space-x-1.5">
                  <User className="w-3.5 h-3.5 text-orange-400" />
                  <span>{isAuthenticated ? 'My Account & Orders' : 'Login / Register'}</span>
                </a>
              </li>
              <li>
                <a href="#about" onClick={(e) => handleLinkClick(e, 'about')} className="hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#contact" onClick={(e) => handleLinkClick(e, 'contact')} className="hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#track" onClick={(e) => handleLinkClick(e, 'track')} className="hover:text-white transition-colors">
                  Track Order
                </a>
              </li>
              <li>
                <a href="#faqs" onClick={(e) => handleLinkClick(e, 'faqs')} className="hover:text-white transition-colors">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#sitemap" onClick={(e) => handleLinkClick(e, 'about')} className="hover:text-white transition-colors">
                  Sitemap
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Service & Policies */}
          <div className="space-y-3">
            <h4 className="text-sm font-black text-white uppercase tracking-wider">
              Customer Service
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#shipping" onClick={(e) => handleLinkClick(e, 'shipping')} className="hover:text-white transition-colors">
                  Shipping Policy
                </a>
              </li>
              <li>
                <a href="#return" onClick={(e) => handleLinkClick(e, 'return')} className="hover:text-white transition-colors">
                  Return Policy
                </a>
              </li>
              <li>
                <a href="#privacy" onClick={(e) => handleLinkClick(e, 'privacy')} className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#terms" onClick={(e) => handleLinkClick(e, 'terms')} className="hover:text-white transition-colors">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#refund" onClick={(e) => handleLinkClick(e, 'return')} className="hover:text-white transition-colors">
                  Refund Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: For Sellers */}
          <div className="space-y-3">
            <h4 className="text-sm font-black text-white uppercase tracking-wider">
              For Sellers
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#seller" onClick={(e) => handleLinkClick(e, 'seller')} className="text-emerald-400 hover:text-emerald-300 font-bold transition-colors">
                  Become a Seller
                </a>
              </li>
              <li>
                <a href="#seller-login" onClick={(e) => handleLinkClick(e, 'seller')} className="hover:text-white transition-colors">
                  Seller Login
                </a>
              </li>
              <li>
                <a href="#seller-center" onClick={(e) => handleLinkClick(e, 'seller')} className="hover:text-white transition-colors">
                  Seller Center
                </a>
              </li>
              <li>
                <a href="#how-to-sell" onClick={(e) => handleLinkClick(e, 'seller')} className="hover:text-white transition-colors">
                  How to Sell
                </a>
              </li>
              <li>
                <a href="#seller-support" onClick={(e) => handleLinkClick(e, 'contact')} className="hover:text-white transition-colors">
                  Seller Support
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Accepted Payment Badges */}
        <div className="pt-8 sm:pt-10 mt-8 sm:mt-10 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
            <span className="text-[11px] font-bold text-slate-500 mr-2 uppercase">Payment Options:</span>
            {['VISA', 'Mastercard', 'PayPal', 'Amex', 'Apple Pay', 'Google Pay', 'Paytm', 'UPI'].map((badge) => (
              <span key={badge} className="bg-slate-800 text-slate-300 text-[10px] font-bold px-2 py-1 rounded border border-slate-700">
                {badge}
              </span>
            ))}
          </div>

          {/* Currency / Language in Footer */}
          <div className="flex items-center space-x-3 text-xs">
            <div className="flex items-center space-x-1.5 bg-slate-800 px-2.5 py-1 rounded-md border border-slate-700">
              <Globe className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="bg-transparent border-none text-slate-200 font-bold focus:outline-hidden text-xs cursor-pointer"
              >
                {Object.values(currenciesData).map((c) => (
                  <option key={c.code} value={c.code} className="bg-slate-800 text-white">
                    {c.code} ({c.symbol})
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center space-x-1.5 bg-slate-800 px-2.5 py-1 rounded-md border border-slate-700">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-transparent border-none text-slate-200 font-bold focus:outline-hidden text-xs cursor-pointer"
              >
                {languagesData.map((l) => (
                  <option key={l.code} value={l.code} className="bg-slate-800 text-white">
                    {l.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-6 mt-6 border-t border-slate-800/60 text-center text-[11px] text-slate-500">
          <p>© 2025 Implex Cart International. All Rights Reserved. Powered by MERN Stack Architecture.</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
