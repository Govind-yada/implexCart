import React, { useState } from 'react';
import { Mail, CheckCircle2, Smartphone, Download } from 'lucide-react';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const NewsletterAppCTA = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const { showToast } = useAuth();

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address.', 'warning');
      return;
    }

    setLoading(true);
    try {
      const res = await api.subscribeNewsletter(email);
      if (res.success) {
        setSubscribed(true);
        showToast(res.message || 'Subscribed successfully!', 'success');
        setEmail('');
      } else {
        showToast(res.error || 'Failed to subscribe.', 'error');
      }
    } catch (err) {
      showToast('Network error subscribing to newsletter.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gradient-to-r from-blue-900 via-blue-800 to-slate-900 text-white py-14 border-t border-blue-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Newsletter Column */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center space-x-2 bg-blue-700/60 text-blue-200 text-xs font-bold px-3 py-1 rounded-full border border-blue-600">
              <Mail className="w-3.5 h-3.5 text-orange-400" />
              <span>STAY AHEAD OF THE DEALS</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              Subscribe to Our VIP Global Newsletter
            </h2>
            <p className="text-xs sm:text-sm text-blue-200 max-w-lg">
              Get secret promotional codes, early-access drops, and up to 70% off delivered straight to your inbox.
            </p>

            {subscribed ? (
              <div className="p-4 bg-emerald-900/60 border border-emerald-500 rounded-xl flex items-center space-x-3 text-xs text-emerald-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <span>Subscribed successfully! Check your inbox for exclusive offers.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-md pt-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  className="flex-1 px-4 py-3 rounded-lg text-xs sm:text-sm text-slate-900 bg-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-orange-500"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-lg transition-colors shadow-md cursor-pointer disabled:opacity-50"
                >
                  {loading ? 'Subscribing...' : 'Subscribe'}
                </button>
              </form>
            )}
          </div>

          {/* App Download Badges Column */}
          <div className="lg:col-span-5 bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col justify-between space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Download the Implex App</h3>
                <p className="text-xs text-blue-200">Shop faster with exclusive in-app coupons</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="#app-store"
                onClick={(e) => { e.preventDefault(); showToast('Mobile app release scheduled for Q4 2026.', 'info'); }}
                className="flex items-center space-x-2 bg-black/60 hover:bg-black text-white px-4 py-2.5 rounded-xl border border-white/20 transition-all cursor-pointer"
              >
                <div className="text-left">
                  <span className="block text-[9px] uppercase tracking-wider text-slate-400">Download on the</span>
                  <span className="text-xs font-bold">Apple App Store</span>
                </div>
              </a>

              <a
                href="#google-play"
                onClick={(e) => { e.preventDefault(); showToast('Mobile app release scheduled for Q4 2026.', 'info'); }}
                className="flex items-center space-x-2 bg-black/60 hover:bg-black text-white px-4 py-2.5 rounded-xl border border-white/20 transition-all cursor-pointer"
              >
                <div className="text-left">
                  <span className="block text-[9px] uppercase tracking-wider text-slate-400">Get it on</span>
                  <span className="text-xs font-bold">Google Play</span>
                </div>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default NewsletterAppCTA;
