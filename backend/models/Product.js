const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: { type: String, unique: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  categorySlug: { type: String, required: true },
  brand: { type: String, default: 'Implex' },
  rating: { type: Number, default: 4.5 },
  reviewsCount: { type: Number, default: 0 },
  price: { type: Number, required: true },
  originalPrice: { type: Number, required: true },
  discountPercent: { type: Number, default: 0 },
  badge: { type: String, default: null },
  image: { type: String, required: true },
  inStock: { type: Boolean, default: true },
  stockCount: { type: Number, default: 50 },
  description: { type: String, required: true },
  specs: { type: Map, of: String, default: {} },
  shipping: { type: String, default: 'Free Delivery' },
  featuredIn: [{ type: String }],
  createdAt: { type: Date, default: Date.now }
});

const ProductModel = mongoose.models.Product || mongoose.model('Product', productSchema);
module.exports = ProductModel;
