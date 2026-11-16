import React, { useState } from 'react';
import { X, Send, CheckCircle2, ChevronDown, HelpCircle, FileText, Phone, Mail, MapPin, Store } from 'lucide-react';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const InfoModal = ({ isOpen, onClose, topic = 'about' }) => {
  if (!isOpen) return null;

  const { showToast } = useAuth();
  const [activeTopic, setActiveTopic] = useState(topic);

  // Contact form state
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactSubject, setContactSubject] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSuccess, setContactSuccess] = useState(false);
  const [contactLoading, setContactLoading] = useState(false);

  // Seller form state
  const [sellerName, setSellerName] = useState('');
  const [sellerCompany, setSellerCompany] = useState('');
  const [sellerCategory, setSellerCategory] = useState('Electronics');
  const [sellerSuccess, setSellerSuccess] = useState(false);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setContactLoading(true);
    try {
      const res = await api.submitContact({
        name: contactName,
        email: contactEmail,
        subject: contactSubject,
        message: contactMessage
      });
      if (res.success) {
        setContactSuccess(true);
        showToast('Your message has been sent to Implex Support!', 'success');
      }
    } catch (err) {
      showToast('Failed to submit message.', 'error');
    } finally {
      setContactLoading(false);
    }
  };

  const handleSellerSubmit = (e) => {
    e.preventDefault();
    setSellerSuccess(true);
    showToast('Seller application submitted! Our team will reach out within 24 hours.', 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col p-6 sm:p-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Navigation Pills */}
        <div className="flex space-x-2 overflow-x-auto pb-3 mb-6 border-b border-slate-200 text-xs font-bold scrollbar-none">
          {[
            { id: 'about', label: 'About Us' },
            { id: 'contact', label: 'Contact Us' },
            { id: 'faqs', label: 'FAQs' },
            { id: 'shipping', label: 'Shipping Policy' },
            { id: 'return', label: 'Return & Refund' },
            { id: 'terms', label: 'Terms & Conditions' },
            { id: 'privacy', label: 'Privacy Policy' },
            { id: 'seller', label: 'Become a Seller' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTopic(item.id)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                activeTopic === item.id
                  ? 'bg-blue-700 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="overflow-y-auto space-y-4 pr-1 text-xs sm:text-sm text-slate-700 leading-relaxed">
          
          {/* About Us */}
          {activeTopic === 'about' && (
            <div className="space-y-4">
              <h2 className="text-xl font-black text-slate-900">About Implex Cart International</h2>
              <p className="text-sm text-slate-600 font-semibold text-orange-600 uppercase tracking-wide">
                HAR GHAR KI SMART SHOPPING — Shop Global, Save More
              </p>
              <p>
                Implex Cart International is a premier global e-commerce marketplace dedicated to bringing world-class consumer electronics, mobile accessories, lifestyle fashion, and modern home essentials directly to consumers worldwide at honest, affordable prices.
              </p>
              <p>
                Founded with the vision to eliminate middlemen markups and cross-border delivery bottlenecks, Implex Cart connects consumers across 100+ countries with genuine, rigorously inspected products from trusted brand manufacturers.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3">
                <div className="p-3 bg-blue-50 rounded-xl border border-blue-200 text-center">
                  <span className="block text-xl font-black text-blue-700">100+</span>
                  <span className="text-xs text-slate-600">Countries Served</span>
                </div>
                <div className="p-3 bg-orange-50 rounded-xl border border-orange-200 text-center">
                  <span className="block text-xl font-black text-orange-600">100%</span>
                  <span className="text-xs text-slate-600">Genuine Guarantee</span>
                </div>
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-center">
                  <span className="block text-xl font-black text-emerald-600">24 / 7</span>
                  <span className="text-xs text-slate-600">Dedicated Support</span>
                </div>
              </div>
            </div>
          )}

          {/* Contact Us */}
          {activeTopic === 'contact' && (
            <div className="space-y-5">
              <div>
                <h2 className="text-xl font-black text-slate-900">Contact Customer Support</h2>
                <p className="text-xs text-slate-500">We are here 24 hours a day, 7 days a week.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-blue-700 flex-shrink-0" />
                  <span>123 Global Trade Center, New York, USA</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-blue-700 flex-shrink-0" />
                  <span>support@implexcart.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-blue-700 flex-shrink-0" />
                  <span>+1 (800) 555-0199</span>
                </div>
              </div>

              {contactSuccess ? (
                <div className="p-6 bg-emerald-50 rounded-xl border border-emerald-200 text-center space-y-2">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h4 className="text-sm font-bold text-emerald-900">Message Delivered Successfully!</h4>
                  <p className="text-xs text-emerald-700">
                    A customer support ticket has been created. A representative will contact you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Your Name</label>
                      <input
                        type="text"
                        required
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:border-blue-700 focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                      <input
                        type="email"
                        required
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder="john@example.com"
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:border-blue-700 focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Subject</label>
                    <input
                      type="text"
                      required
                      value={contactSubject}
                      onChange={(e) => setContactSubject(e.target.value)}
                      placeholder="Order inquiry, tracking, or general question"
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:border-blue-700 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Message</label>
                    <textarea
                      required
                      rows={3}
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      placeholder="How can our support team assist you today?"
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:border-blue-700 focus:outline-hidden"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={contactLoading}
                    className="bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs px-6 py-2.5 rounded-lg flex items-center space-x-1.5 transition-colors cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{contactLoading ? 'Sending...' : 'Send Message'}</span>
                  </button>
                </form>
              )}
            </div>
          )}

          {/* FAQs */}
          {activeTopic === 'faqs' && (
            <div className="space-y-4">
              <h2 className="text-xl font-black text-slate-900">Frequently Asked Questions</h2>
              <div className="space-y-3">
                {[
                  {
                    q: "How do I track my order?",
                    a: "You can click on the 'Track Order' button located in the top navigation bar or the footer. Enter your Order ID (e.g. IMP-2026-8941) to see live milestone updates."
                  },
                  {
                    q: "What payment methods are supported on Implex Cart?",
                    a: "We support UPI (PhonePe, Google Pay, Paytm, BHIM), all major Credit & Debit cards (VISA, Mastercard, RuPay, Amex), Net Banking, and Cash on Delivery (COD) for eligible locations."
                  },
                  {
                    q: "What is your return & replacement policy?",
                    a: "We offer a 7-day hassle-free return window for all items that arrive damaged, defective, or different from described. Simply initiate a return request from your dashboard."
                  },
                  {
                    q: "Does Implex Cart ship internationally?",
                    a: "Yes! Implex Cart International provides end-to-end tracked courier delivery to over 100 countries worldwide."
                  }
                ].map((faq, i) => (
                  <div key={i} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                    <h4 className="font-bold text-slate-900 flex items-center space-x-1.5 text-xs sm:text-sm">
                      <HelpCircle className="w-4 h-4 text-blue-700 flex-shrink-0" />
                      <span>{faq.q}</span>
                    </h4>
                    <p className="text-xs text-slate-600 pl-5">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Shipping Policy */}
          {activeTopic === 'shipping' && (
            <div className="space-y-3">
              <h2 className="text-xl font-black text-slate-900">Shipping Policy</h2>
              <p>
                All orders are processed and dispatched within 24–48 hours of payment confirmation. Domestic orders typically arrive within 2–4 business days, while international shipments take between 5–9 business days depending on customs clearance.
              </p>
              <p>
                <b>Free Shipping:</b> Orders exceeding ₹499 (or $10 USD equivalent) automatically qualify for 100% Free Standard Delivery.
              </p>
            </div>
          )}

          {/* Return & Refund */}
          {activeTopic === 'return' && (
            <div className="space-y-3">
              <h2 className="text-xl font-black text-slate-900">7 Days Return & Refund Policy</h2>
              <p>
                At Implex Cart, customer satisfaction is our highest priority. If you receive an item that is defective, damaged, or not as expected, you may request a return within 7 calendar days of delivery.
              </p>
              <p>
                Approved refunds are initiated within 48 hours to the original payment method (or via UPI/bank transfer for Cash on Delivery orders).
              </p>
            </div>
          )}

          {/* Terms & Conditions */}
          {activeTopic === 'terms' && (
            <div className="space-y-3">
              <h2 className="text-xl font-black text-slate-900">Terms & Conditions</h2>
              <p>
                By accessing or placing orders through Implex Cart International, you agree to comply with our commercial terms of service, acceptable use policies, and global trade guidelines.
              </p>
              <p>
                All product pricing, promotional discounts, and availability are subject to change without prior notice.
              </p>
            </div>
          )}

          {/* Privacy Policy */}
          {activeTopic === 'privacy' && (
            <div className="space-y-3">
              <h2 className="text-xl font-black text-slate-900">Privacy Policy</h2>
              <p>
                Your privacy and data security are strictly protected. We never sell or lease your personal information to third parties. All transactions and checkout communications are encrypted with 256-bit SSL protocols.
              </p>
            </div>
          )}

          {/* Become a Seller */}
          {activeTopic === 'seller' && (
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-black text-slate-900">Become an Implex Global Seller</h2>
                <p className="text-xs text-slate-500">Sell your products to millions of shoppers in 100+ countries.</p>
              </div>

              {sellerSuccess ? (
                <div className="p-6 bg-emerald-50 rounded-xl border border-emerald-200 text-center space-y-2">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h4 className="text-sm font-bold text-emerald-900">Seller Application Submitted!</h4>
                  <p className="text-xs text-emerald-700">
                    Our onboarding team will review your brand details and contact you via email within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSellerSubmit} className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Contact Name</label>
                    <input
                      type="text"
                      required
                      value={sellerName}
                      onChange={(e) => setSellerName(e.target.value)}
                      placeholder="Authorized representative name"
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:border-blue-700 focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Company / Brand Name</label>
                    <input
                      type="text"
                      required
                      value={sellerCompany}
                      onChange={(e) => setSellerCompany(e.target.value)}
                      placeholder="e.g. Apex Electronics Ltd."
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:border-blue-700 focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Primary Product Category</label>
                    <select
                      value={sellerCategory}
                      onChange={(e) => setSellerCategory(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:border-blue-700 focus:outline-hidden"
                    >
                      <option>Electronics</option>
                      <option>Mobiles & Tablets</option>
                      <option>Fashion & Apparel</option>
                      <option>Home & Kitchen</option>
                      <option>Beauty & Personal Care</option>
                      <option>Sports & Outdoors</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-3 rounded-lg flex items-center justify-center space-x-2 transition-colors cursor-pointer mt-2"
                  >
                    <Store className="w-4 h-4" />
                    <span>Submit Seller Registration</span>
                  </button>
                </form>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default InfoModal;
