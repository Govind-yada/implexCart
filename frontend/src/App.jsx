import React, { useState, useEffect } from 'react';
import { api } from './services/api';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { LocalizationProvider } from './context/LocalizationContext';

// Components
import AnnouncementBar from './components/Header/AnnouncementBar';
import MainHeader from './components/Header/MainHeader';
import NavBar from './components/Header/NavBar';
import HeroSlider from './components/Hero/HeroSlider';
import TrustBar from './components/TrustBar';
import CategoryGrid from './components/Categories/CategoryGrid';
import SuperFlashSale from './components/Deals/SuperFlashSale';
import ProductCard from './components/Products/ProductCard';
import ProductSection from './components/Products/ProductSection';
import ProductModal from './components/Products/ProductModal';
import BrandShowcase from './components/Brands/BrandShowcase';
import CustomerReviews from './components/Reviews/CustomerReviews';
import WhyShopWithUs from './components/WhyShop/WhyShopWithUs';
import CartDrawer from './components/Cart/CartDrawer';
import CheckoutModal from './components/Checkout/CheckoutModal';
import AuthModal from './components/Auth/AuthModal';
import TrackOrderModal from './components/Orders/TrackOrderModal';
import OrderHistoryModal from './components/Orders/OrderHistoryModal';
import InfoModal from './components/Informational/InfoModal';
import NewsletterAppCTA from './components/Newsletter/NewsletterAppCTA';
import Footer from './components/Footer/Footer';

function MainApp() {
  const { authToast, isAuthenticated, openAuthModal } = useAuth();

  // Catalog state
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [heroSlides, setHeroSlides] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [customerReviews, setCustomerReviews] = useState([]);
  const [whyShopFeatures, setWhyShopFeatures] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters & Search
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('featured');

  // Modals state
  const [activeProductModal, setActiveProductModal] = useState(null);
  const [isTrackOrderOpen, setIsTrackOrderOpen] = useState(false);
  const [trackOrderId, setTrackOrderId] = useState('');
  const [isOrderHistoryOpen, setIsOrderHistoryOpen] = useState(false);
  const [infoModalTopic, setInfoModalTopic] = useState(null); // 'about' | 'contact' | 'faqs' | etc.

  // Fetch Catalog Data
  useEffect(() => {
    const loadCatalog = async () => {
      try {
        const res = await api.getProducts();
        if (res.success) {
          setProducts(res.products || []);
          setCategories(res.categories || []);
          setBrands(res.brands || []);
          setHeroSlides(res.heroSlides || []);
          setAnnouncements(res.announcements || []);
          setCustomerReviews(res.customerReviews || []);
          setWhyShopFeatures(res.whyShopFeatures || []);
        }
      } catch (e) {
        console.error('Failed to load catalog data:', e);
      } finally {
        setLoading(false);
      }
    };
    loadCatalog();
  }, []);

  // Filter products for the primary catalog grid
  const filteredProducts = products.filter((prod) => {
    const matchesCat = !selectedCategory ||
      prod.categorySlug?.toLowerCase() === selectedCategory.toLowerCase() ||
      prod.category?.toLowerCase() === selectedCategory.toLowerCase();
    
    const matchesBrand = !selectedBrand ||
      prod.brand?.toLowerCase() === selectedBrand.toLowerCase();

    const matchesSearch = !searchQuery ||
      prod.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.category?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCat && matchesBrand && matchesSearch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === 'price-low') return a.price - b.price;
    if (sortOption === 'price-high') return b.price - a.price;
    if (sortOption === 'rating') return b.rating - a.rating;
    return 0;
  });

  const bestSellers = products.filter(p => Array.isArray(p.featuredIn) && p.featuredIn.includes('bestSellers'));
  const newArrivals = products.filter(p => Array.isArray(p.featuredIn) && p.featuredIn.includes('newArrivals'));
  const trending = products.filter(p => Array.isArray(p.featuredIn) && p.featuredIn.includes('trending'));

  const handleOpenTrackOrder = () => {
    setIsTrackOrderOpen(true);
  };

  const handleOpenOrderHistory = () => {
    if (!isAuthenticated) {
      openAuthModal('signin', 'Please sign in to view your order history.');
      return;
    }
    setIsOrderHistoryOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      
      {/* Toast Notification */}
      {authToast && (
        <div className={`fixed bottom-5 right-5 z-50 px-4 py-3 rounded-xl shadow-xl text-xs font-bold flex items-center space-x-2 animate-in slide-in-from-bottom-3 ${
          authToast.type === 'success' ? 'bg-emerald-600 text-white' :
          authToast.type === 'warning' ? 'bg-amber-600 text-white' :
          authToast.type === 'error' ? 'bg-red-600 text-white' :
          'bg-slate-900 text-white'
        }`}>
          <span>{authToast.message}</span>
        </div>
      )}

      {/* Header Stack */}
      <AnnouncementBar announcements={announcements} />
      <MainHeader
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearchSubmit={() => {
          const el = document.getElementById('catalog-grid');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenOrderHistory={handleOpenOrderHistory}
      />
      <NavBar
        categories={categories}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          const el = document.getElementById('catalog-grid');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenTrackOrder={handleOpenTrackOrder}
        onOpenBecomeSeller={() => setInfoModalTopic('seller')}
      />

      {/* Main Body */}
      <main className="flex-1">
        
        {/* Hero Banner Slider */}
        <HeroSlider slides={heroSlides} />

        {/* 4 Trust Pillars Bar */}
        <TrustBar />

        {/* Shop by Category Grid */}
        <CategoryGrid
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            const el = document.getElementById('catalog-grid');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Super Flash Sale with Countdown Timer */}
        <SuperFlashSale
          products={products}
          onOpenProductModal={(p) => setActiveProductModal(p)}
        />

        {/* Interactive Primary Catalog Grid with Filters & Sort */}
        <section id="catalog-grid" className="py-12 bg-white border-b border-slate-200 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200 mb-8 gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  {selectedCategory ? `${selectedCategory} Products` : 'All Featured Products'}
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  Showing {sortedProducts.length} items
                  {selectedBrand ? ` for brand "${selectedBrand}"` : ''}
                  {searchQuery ? ` matching "${searchQuery}"` : ''}
                </p>
              </div>

              {/* Sort Selector */}
              <div className="flex items-center space-x-2 text-xs font-bold text-slate-600">
                <span>Sort By:</span>
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="px-3 py-1.5 border border-slate-300 rounded-lg bg-slate-50 text-slate-800 text-xs font-semibold focus:outline-hidden"
                >
                  <option value="featured">Featured / Best Match</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            {sortedProducts.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <p className="text-base font-bold text-slate-700">No products match your criteria</p>
                <p className="text-xs text-slate-400">Try clearing your filters or search keywords.</p>
                <button
                  onClick={() => {
                    setSelectedCategory('');
                    setSelectedBrand('');
                    setSearchQuery('');
                  }}
                  className="bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-lg"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {sortedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onOpenModal={(p) => setActiveProductModal(p)}
                  />
                ))}
              </div>
            )}

          </div>
        </section>

        {/* Best Sellers Carousel */}
        <ProductSection
          id="best-sellers"
          title="Best Sellers"
          subtitle="Our most loved, highest-rated essentials"
          products={bestSellers}
          onOpenModal={(p) => setActiveProductModal(p)}
          badgeText="Customer Favorites"
        />

        {/* New Arrivals Carousel */}
        <ProductSection
          id="new-arrivals"
          title="New Arrivals"
          subtitle="Explore the latest technology and lifestyle drops"
          products={newArrivals}
          onOpenModal={(p) => setActiveProductModal(p)}
          badgeText="Just In"
        />

        {/* Trending Products */}
        <ProductSection
          id="trending"
          title="Trending Global Products"
          subtitle="High velocity products trending in 100+ countries"
          products={trending}
          onOpenModal={(p) => setActiveProductModal(p)}
          badgeText="Hot Right Now"
        />

        {/* Shop by Brand Showcase */}
        <BrandShowcase
          brands={brands}
          selectedBrand={selectedBrand}
          onSelectBrand={(b) => {
            setSelectedBrand(b);
            const el = document.getElementById('catalog-grid');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Customer Reviews Section */}
        <CustomerReviews reviews={customerReviews} />

        {/* Why Shop With Us (6 Benefit Tiles) */}
        <WhyShopWithUs features={whyShopFeatures} />

        {/* Newsletter & Mobile App CTA */}
        <NewsletterAppCTA />

      </main>

      {/* Footer */}
      <Footer
        onOpenInfoModal={(topic) => setInfoModalTopic(topic)}
        onOpenTrackOrder={handleOpenTrackOrder}
        onOpenBecomeSeller={() => setInfoModalTopic('seller')}
      />

      {/* Global Modals */}
      <ProductModal
        product={activeProductModal}
        isOpen={!!activeProductModal}
        onClose={() => setActiveProductModal(null)}
      />

      <CartDrawer />

      <CheckoutModal
        onOrderSuccess={(order) => {
          setTrackOrderId(order.orderId);
        }}
      />

      <AuthModal />

      <TrackOrderModal
        isOpen={isTrackOrderOpen}
        onClose={() => setIsTrackOrderOpen(false)}
        initialOrderId={trackOrderId}
      />

      <OrderHistoryModal
        isOpen={isOrderHistoryOpen}
        onClose={() => setIsOrderHistoryOpen(false)}
        onTrackOrder={(id) => {
          setTrackOrderId(id);
          setIsTrackOrderOpen(true);
        }}
      />

      <InfoModal
        isOpen={!!infoModalTopic}
        topic={infoModalTopic || 'about'}
        onClose={() => setInfoModalTopic(null)}
      />

    </div>
  );
}

export default function App() {
  return (
    <LocalizationProvider>
      <AuthProvider>
        <WishlistProvider>
          <CartProvider>
            <MainApp />
          </CartProvider>
        </WishlistProvider>
      </AuthProvider>
    </LocalizationProvider>
  );
}
