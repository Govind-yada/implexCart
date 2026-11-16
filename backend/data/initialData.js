const initialData = {
  siteMetadata: {
    title: "Implex Cart International — Shop Global, Save More",
    brandName: "IMPLEX CART INTERNATIONAL",
    tagline: "Har Ghar Ki Smart Shopping",
    subtitle: "Your global marketplace for quality products at unbeatable prices. Delivering happiness to 100+ countries since 2025.",
    supportEmail: "support@implexcart.com",
    supportPhone: "+1 (800) 555-0199",
    address: "123 Global Trade Center, New York, USA",
    copyright: "© 2025 Implex Cart International. All Rights Reserved."
  },

  announcements: [
    "✨ Har Ghar Ki Smart Shopping ✨",
    "🚚 Free Shipping Above ₹499",
    "🔥 7 Days Return",
    "💳 Secure Payment"
  ],

  heroSlides: [
    {
      id: "hero-1",
      badge: "SHOP GLOBAL, SAVE MORE",
      title: "Discover Global Products at Best Prices",
      subtitle: "Top Quality • Best Deals • Fast Delivery",
      ctaText: "Shop Now",
      ctaLink: "#categories",
      promoBadge: "BIG SAVINGS UP TO 70% OFF",
      image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1000&auto=format&fit=crop&q=80"
    },
    {
      id: "hero-2",
      badge: "NEW SEASON ARRIVALS",
      title: "Latest Tech, Unbeatable Prices",
      subtitle: "Smartphones • Wearables • Audio gear",
      ctaText: "Explore Deals",
      ctaLink: "#flash-sale",
      promoBadge: "FRESH DROPS EVERY WEEK",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1000&auto=format&fit=crop&q=80"
    }
  ],

  trustBadges: [
    { title: "Free Delivery", subtitle: "On orders above ₹499", icon: "Truck" },
    { title: "Secure Payment", subtitle: "100% secure payment", icon: "ShieldCheck" },
    { title: "Easy Returns", subtitle: "7 days return", icon: "RotateCcw" },
    { title: "24/7 Support", subtitle: "We are always here", icon: "Headphones" }
  ],

  categories: [
    {
      id: "cat-electronics",
      name: "Electronics",
      slug: "electronics",
      image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=300&auto=format&fit=crop&q=80"
    },
    {
      id: "cat-mobiles",
      name: "Mobiles & Tablets",
      slug: "mobiles-tablets",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&auto=format&fit=crop&q=80"
    },
    {
      id: "cat-fashion",
      name: "Fashion",
      slug: "fashion",
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=300&auto=format&fit=crop&q=80"
    },
    {
      id: "cat-home-kitchen",
      name: "Home & Kitchen",
      slug: "home-kitchen",
      image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=300&auto=format&fit=crop&q=80"
    },
    {
      id: "cat-beauty",
      name: "Beauty & Personal Care",
      slug: "beauty-personal-care",
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&auto=format&fit=crop&q=80"
    },
    {
      id: "cat-sports",
      name: "Sports & Outdoors",
      slug: "sports-outdoors",
      image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=300&auto=format&fit=crop&q=80"
    },
    {
      id: "cat-toys",
      name: "Toys & Games",
      slug: "toys-games",
      image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=300&auto=format&fit=crop&q=80"
    },
    {
      id: "cat-automotive",
      name: "Automotive",
      slug: "automotive",
      image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=300&auto=format&fit=crop&q=80"
    },
    {
      id: "cat-more",
      name: "More Categories",
      slug: "more-categories",
      image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=300&auto=format&fit=crop&q=80"
    }
  ],

  products: [
    {
      id: "prod-1",
      name: "Pro Wireless Earbuds",
      category: "Electronics",
      categorySlug: "electronics",
      brand: "boAt",
      rating: 4.5,
      reviewsCount: 1240,
      price: 59.99,
      originalPrice: 99.99,
      discountPercent: 40,
      badge: "Best Seller",
      image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&auto=format&fit=crop&q=80",
      inStock: true,
      stockCount: 45,
      description: "Experience premium sound quality with active noise cancellation, low latency gaming mode, and ergonomic all-day comfort. Features Bluetooth 5.3 and 36-hour playback with the wireless charging case.",
      specs: {
        "Connectivity": "Bluetooth 5.3",
        "Battery Life": "Up to 36 hours",
        "Water Resistance": "IPX5 Sweatproof",
        "Noise Cancellation": "Active Noise Cancellation (ANC)"
      },
      shipping: "Free Delivery",
      featuredIn: ["flashSale", "bestSellers", "trending"]
    },
    {
      id: "prod-2",
      name: "Smart Watch Series 7",
      category: "Electronics",
      categorySlug: "electronics",
      brand: "Apple",
      rating: 4.7,
      reviewsCount: 890,
      price: 129.99,
      originalPrice: 199.99,
      discountPercent: 35,
      badge: "New",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80",
      inStock: true,
      stockCount: 28,
      description: "Track your health and daily workouts with advanced heart rate sensors, SpO2 monitoring, crisp AMOLED touch display, GPS navigation, and 5-day continuous battery life.",
      specs: {
        "Display": "1.78\" Super AMOLED",
        "Battery": "5 Days Battery Life",
        "Sensors": "SpO2, Heart Rate, Sleep Monitor",
        "Compatibility": "iOS & Android"
      },
      shipping: "Free Delivery",
      featuredIn: ["flashSale", "bestSellers", "newArrivals", "trending"]
    },
    {
      id: "prod-3",
      name: "Flagship Smartphone 5G",
      category: "Mobiles & Tablets",
      categorySlug: "mobiles-tablets",
      brand: "Samsung",
      rating: 4.6,
      reviewsCount: 2103,
      price: 499.99,
      originalPrice: 699.99,
      discountPercent: 29,
      badge: "Hot Deal",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop&q=80",
      inStock: true,
      stockCount: 15,
      description: "Ultra-fast 5G performance with pro-grade triple camera system, stunning 120Hz dynamic AMOLED display, 256GB storage, and 5000mAh battery with 45W fast charging.",
      specs: {
        "Processor": "Octa-Core 5G Chipset",
        "Memory & Storage": "8GB RAM + 256GB Storage",
        "Camera": "108MP + 12MP + 5MP",
        "Battery": "5000mAh Fast Charging"
      },
      shipping: "Free Delivery",
      featuredIn: ["flashSale", "bestSellers", "trending"]
    },
    {
      id: "prod-4",
      name: "Over-Ear Noise Cancel Headphones",
      category: "Electronics",
      categorySlug: "electronics",
      brand: "Sony",
      rating: 4.4,
      reviewsCount: 657,
      price: 89.99,
      originalPrice: 149.99,
      discountPercent: 40,
      badge: "Popular",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80",
      inStock: true,
      stockCount: 30,
      description: "Immersive studio acoustics with custom 40mm high-definition audio drivers, memory foam ear cups, and industry-leading noise isolation for travel and work.",
      specs: {
        "Drivers": "40mm Neodymium",
        "Playtime": "Up to 40 Hours",
        "Microphone": "Built-in Dual HD Mics",
        "Foldable": "Yes, with travel pouch"
      },
      shipping: "Free Delivery",
      featuredIn: ["flashSale", "bestSellers"]
    },
    {
      id: "prod-5",
      name: "Mirrorless Camera 4K",
      category: "Electronics",
      categorySlug: "electronics",
      brand: "Sony",
      rating: 4.8,
      reviewsCount: 412,
      price: 749.99,
      originalPrice: 999.99,
      discountPercent: 25,
      badge: "Premium",
      image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&auto=format&fit=crop&q=80",
      inStock: true,
      stockCount: 8,
      description: "Capture cinematic 4K video at 60fps and stunning 24.2MP high-resolution photography with real-time eye autofocus and 5-axis in-body image stabilization.",
      specs: {
        "Resolution": "24.2 Megapixels APS-C",
        "Video": "4K UHD @ 60fps",
        "Autofocus": "425 Phase Detection Points",
        "Screen": "Tiltable Touch LCD"
      },
      shipping: "Free Delivery",
      featuredIn: ["bestSellers", "newArrivals", "trending"]
    },
    {
      id: "prod-6",
      name: "Luxury Eau de Parfum 100ml",
      category: "Beauty & Personal Care",
      categorySlug: "beauty-personal-care",
      brand: "Philips",
      rating: 4.3,
      reviewsCount: 318,
      price: 45.99,
      originalPrice: 75.99,
      discountPercent: 39,
      badge: "Editor's Choice",
      image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&auto=format&fit=crop&q=80",
      inStock: true,
      stockCount: 60,
      description: "Long-lasting fragrance featuring an exquisite blend of rare French floral, citrus, and warm woody amber notes crafted by master perfumers.",
      specs: {
        "Volume": "100 ml / 3.4 fl oz",
        "Scent Family": "Woody Amber & Floral",
        "Longevity": "12+ Hours",
        "Origin": "Imported"
      },
      shipping: "Free Delivery",
      featuredIn: ["bestSellers", "newArrivals"]
    }
  ],

  brands: [
    { name: "Samsung", logo: "https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg" },
    { name: "boAt", logo: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Boat_logo.svg" },
    { name: "Puma", logo: "https://upload.wikimedia.org/wikipedia/commons/8/88/Puma_complete_logo.svg" },
    { name: "Nike", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg" },
    { name: "Philips", logo: "https://upload.wikimedia.org/wikipedia/commons/5/52/Philips_logo_new.svg" },
    { name: "Sony", logo: "https://upload.wikimedia.org/wikipedia/commons/c/ca/Sony_logo.svg" },
    { name: "Apple", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" },
    { name: "Lenovo", logo: "https://upload.wikimedia.org/wikipedia/commons/b/b8/Lenovo_logo_2015.svg" }
  ],

  customerReviews: [
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
  ],

  whyShopFeatures: [
    { id: 1, title: "Global Shipping", description: "Delivering to 100+ Countries", icon: "Globe" },
    { id: 2, title: "Best Quality", description: "100% Genuine Products", icon: "Award" },
    { id: 3, title: "Best Prices", description: "Unbeatable Prices Everyday", icon: "Tag" },
    { id: 4, title: "Secure Payments", description: "Multiple Payment Options", icon: "CreditCard" },
    { id: 5, title: "Easy Returns", description: "Hassle Free Returns", icon: "RefreshCw" },
    { id: 6, title: "Customer Support", description: "24/7 Expert Support", icon: "LifeBuoy" }
  ],

  currencies: {
    USD: { code: "USD", symbol: "$", rate: 1.0, name: "US Dollar" },
    INR: { code: "INR", symbol: "₹", rate: 84.0, name: "Indian Rupee" },
    EUR: { code: "EUR", symbol: "€", rate: 0.92, name: "Euro" },
    GBP: { code: "GBP", symbol: "£", rate: 0.79, name: "British Pound" }
  },

  languages: [
    { code: "en", name: "English" },
    { code: "es", name: "Español" },
    { code: "fr", name: "Français" },
    { code: "hi", name: "हिन्दी" }
  ],

  faqs: [
    {
      q: "How do I track my order?",
      a: "Click on 'Track Order' in the header navigation or footer and enter your Order ID (received upon successful checkout). You will see real-time milestone updates from dispatch to doorstep delivery."
    },
    {
      q: "What payment methods are supported?",
      a: "We support UPI (Google Pay, PhonePe, Paytm, BHIM), Credit/Debit Cards (VISA, Mastercard, RuPay, Amex), Net Banking, and Cash on Delivery (COD) for eligible pin codes."
    },
    {
      q: "What is your return & refund policy?",
      a: "We offer a 7-day hassle-free return window for all eligible items. Once returned items pass quality inspection, refunds are processed within 2-4 business days."
    },
    {
      q: "Is international shipping available?",
      a: "Yes! Implex Cart International ships to over 100 countries globally with end-to-end tracked courier services."
    }
  ]
};

module.exports = initialData;
