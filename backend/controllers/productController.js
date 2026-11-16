const { Products, readStore } = require('../models/store');
const initialData = require('../data/initialData');

// @desc    Get all products with filters
// @route   GET /api/products
const getProducts = async (req, res) => {
  try {
    const { category, brand, search, sort, featured } = req.query;
    let products = await Products.find({ categorySlug: category, brand, search });

    if (featured) {
      products = products.filter(p => Array.isArray(p.featuredIn) && p.featuredIn.includes(featured));
    }

    if (sort === 'price-low') {
      products = [...products].sort((a, b) => a.price - b.price);
    } else if (sort === 'price-high') {
      products = [...products].sort((a, b) => b.price - a.price);
    } else if (sort === 'rating') {
      products = [...products].sort((a, b) => b.rating - a.rating);
    }

    const store = readStore();

    res.json({
      success: true,
      count: products.length,
      products,
      categories: store.categories || initialData.categories,
      brands: store.brands || initialData.brands,
      heroSlides: store.heroSlides || initialData.heroSlides,
      trustBadges: initialData.trustBadges,
      announcements: initialData.announcements,
      siteMetadata: initialData.siteMetadata,
      currencies: initialData.currencies,
      customerReviews: store.customerReviews || initialData.customerReviews,
      whyShopFeatures: initialData.whyShopFeatures
    });
  } catch (error) {
    console.error('Fetch products error:', error);
    // Graceful fallback to initial data to match resilience specification
    res.json({
      success: true,
      count: initialData.products.length,
      products: initialData.products,
      categories: initialData.categories,
      brands: initialData.brands,
      heroSlides: initialData.heroSlides,
      trustBadges: initialData.trustBadges,
      announcements: initialData.announcements,
      siteMetadata: initialData.siteMetadata,
      currencies: initialData.currencies,
      customerReviews: initialData.customerReviews,
      whyShopFeatures: initialData.whyShopFeatures
    });
  }
};

// @desc    Get single product by id
// @route   GET /api/products/:id
const getProductById = async (req, res) => {
  try {
    const product = await Products.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found.' });
    }
    res.json({ success: true, product });
  } catch (error) {
    console.error('Fetch product by id error:', error);
    res.status(500).json({ error: 'Failed to fetch product details.' });
  }
};

// @desc    Get categories
// @route   GET /api/categories
const getCategories = (req, res) => {
  const store = readStore();
  res.json({ success: true, categories: store.categories || initialData.categories });
};

module.exports = {
  getProducts,
  getProductById,
  getCategories
};
