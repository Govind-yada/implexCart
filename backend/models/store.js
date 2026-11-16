const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const initialData = require('../data/initialData');
const UserModel = require('./User');
const ProductModel = require('./Product');
const OrderModel = require('./Order');
const { getDBMode } = require('../config/db');

const dbFilePath = path.join(__dirname, '..', 'data', 'db.json');

// Ensure db.json file exists and has seed data
const getInitialStore = () => {
  return {
    users: [
      {
        id: 'usr_demo_1',
        name: 'Implex Demo Customer',
        email: 'demo@implexcart.online',
        password: bcrypt.hashSync('demo1234', 10),
        role: 'user',
        phone: '+91 98765 43210',
        addresses: [
          {
            fullName: 'Implex Demo Customer',
            street: '101 Horizon Towers, MG Road',
            city: 'Bangalore',
            state: 'Karnataka',
            zipCode: '560001',
            country: 'India',
            isDefault: true
          }
        ],
        wishlist: ['prod-1'],
        createdAt: new Date().toISOString()
      },
      {
        id: 'usr_admin_1',
        name: 'Implex Administrator',
        email: 'admin@implexcart.online',
        password: bcrypt.hashSync('admin1234', 10),
        role: 'admin',
        phone: '+1 (800) 555-0199',
        addresses: [],
        wishlist: [],
        createdAt: new Date().toISOString()
      }
    ],
    products: initialData.products,
    categories: initialData.categories,
    heroSlides: initialData.heroSlides,
    brands: initialData.brands,
    customerReviews: initialData.customerReviews,
    orders: [
      {
        orderId: 'IMP-2026-8941',
        user: {
          userId: 'usr_demo_1',
          name: 'Implex Demo Customer',
          email: 'demo@implexcart.online',
          phone: '+91 98765 43210'
        },
        items: [
          {
            productId: 'prod-1',
            name: 'Pro Wireless Earbuds',
            price: 59.99,
            quantity: 1,
            image: initialData.products[0].image
          }
        ],
        shippingAddress: {
          fullName: 'Implex Demo Customer',
          street: '101 Horizon Towers, MG Road',
          city: 'Bangalore',
          state: 'Karnataka',
          zipCode: '560001',
          country: 'India'
        },
        paymentMethod: 'upi',
        paymentStatus: 'completed',
        orderStatus: 'Shipped',
        pricing: {
          subtotal: 59.99,
          discount: 0,
          shippingFee: 0,
          total: 59.99,
          currency: 'USD'
        },
        timeline: [
          { status: 'Order Placed', timestamp: new Date(Date.now() - 86400000 * 2).toISOString(), message: 'Order successfully received.' },
          { status: 'Processing', timestamp: new Date(Date.now() - 86400000).toISOString(), message: 'Items packed and quality checked.' },
          { status: 'Shipped', timestamp: new Date(Date.now() - 3600000 * 5).toISOString(), message: 'Package handed over to Express Global Courier.' }
        ],
        createdAt: new Date(Date.now() - 86400000 * 2).toISOString()
      }
    ],
    newsletters: [
      { email: 'newsletter.sample@implexcart.online', subscribedAt: new Date().toISOString() }
    ],
    contactMessages: []
  };
};

const readStore = () => {
  try {
    if (!fs.existsSync(dbFilePath)) {
      const initial = getInitialStore();
      fs.writeFileSync(dbFilePath, JSON.stringify(initial, null, 2), 'utf-8');
      return initial;
    }
    const data = fs.readFileSync(dbFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading persistent store, creating fresh:', err);
    const initial = getInitialStore();
    fs.writeFileSync(dbFilePath, JSON.stringify(initial, null, 2), 'utf-8');
    return initial;
  }
};

const writeStore = (data) => {
  try {
    fs.writeFileSync(dbFilePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing persistent store:', err);
  }
};

// Seed MongoDB if connected and empty
const seedMongoIfNeeded = async () => {
  if (getDBMode() === 'mongodb') {
    try {
      const count = await ProductModel.countDocuments();
      if (count === 0) {
        console.log('[Database] Seeding initial products to MongoDB...');
        await ProductModel.insertMany(initialData.products);
      }
    } catch (e) {
      console.error('[Database] Failed to seed Mongo:', e.message);
    }
  }
};

// Unified Model Adapters
const Users = {
  async findOne(query) {
    if (getDBMode() === 'mongodb') {
      return await UserModel.findOne(query);
    }
    const store = readStore();
    if (query.email) {
      return store.users.find(u => u.email.toLowerCase() === query.email.toLowerCase()) || null;
    }
    if (query._id || query.id) {
      const id = query._id || query.id;
      return store.users.find(u => (u.id === id || u._id === id)) || null;
    }
    return null;
  },

  async findById(id) {
    return this.findOne({ id });
  },

  async create(userData) {
    if (getDBMode() === 'mongodb') {
      return await UserModel.create(userData);
    }
    const store = readStore();
    const newUser = {
      id: 'usr_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      ...userData,
      wishlist: userData.wishlist || [],
      addresses: userData.addresses || [],
      createdAt: new Date().toISOString()
    };
    store.users.push(newUser);
    writeStore(store);
    return newUser;
  },

  async updateWishlist(userId, productId) {
    if (getDBMode() === 'mongodb') {
      const user = await UserModel.findById(userId);
      if (!user) return null;
      const idx = user.wishlist.indexOf(productId);
      if (idx > -1) {
        user.wishlist.splice(idx, 1);
      } else {
        user.wishlist.push(productId);
      }
      await user.save();
      return user.wishlist;
    }
    const store = readStore();
    const user = store.users.find(u => u.id === userId || u._id === userId);
    if (!user) return null;
    if (!Array.isArray(user.wishlist)) user.wishlist = [];
    const idx = user.wishlist.indexOf(productId);
    if (idx > -1) {
      user.wishlist.splice(idx, 1);
    } else {
      user.wishlist.push(productId);
    }
    writeStore(store);
    return user.wishlist;
  }
};

const Products = {
  async find(filter = {}) {
    if (getDBMode() === 'mongodb') {
      return await ProductModel.find(filter);
    }
    const store = readStore();
    let prods = store.products || initialData.products;
    if (filter.categorySlug) {
      prods = prods.filter(p => p.categorySlug.toLowerCase() === filter.categorySlug.toLowerCase());
    }
    if (filter.brand) {
      prods = prods.filter(p => p.brand.toLowerCase() === filter.brand.toLowerCase());
    }
    if (filter.search) {
      const term = filter.search.toLowerCase();
      prods = prods.filter(p => p.name.toLowerCase().includes(term) || p.description.toLowerCase().includes(term) || p.category.toLowerCase().includes(term));
    }
    return prods;
  },

  async findById(id) {
    if (getDBMode() === 'mongodb') {
      return await ProductModel.findOne({ $or: [{ id }, { _id: id }] });
    }
    const store = readStore();
    return (store.products || initialData.products).find(p => p.id === id || p._id === id) || null;
  }
};

const Orders = {
  async create(orderData) {
    if (getDBMode() === 'mongodb') {
      return await OrderModel.create(orderData);
    }
    const store = readStore();
    const newOrder = {
      ...orderData,
      createdAt: new Date().toISOString()
    };
    if (!store.orders) store.orders = [];
    store.orders.unshift(newOrder);
    writeStore(store);
    return newOrder;
  },

  async findByOrderId(orderId) {
    if (getDBMode() === 'mongodb') {
      return await OrderModel.findOne({ orderId });
    }
    const store = readStore();
    return (store.orders || []).find(o => o.orderId.toLowerCase() === orderId.toLowerCase()) || null;
  },

  async findByUser(userId, email) {
    if (getDBMode() === 'mongodb') {
      return await OrderModel.find({ $or: [{ 'user.userId': userId }, { 'user.email': email }] }).sort({ createdAt: -1 });
    }
    const store = readStore();
    return (store.orders || []).filter(o => 
      (userId && o.user?.userId === userId) || (email && o.user?.email.toLowerCase() === email.toLowerCase())
    );
  }
};

const Newsletters = {
  async add(email) {
    const store = readStore();
    if (!store.newsletters) store.newsletters = [];
    const exists = store.newsletters.some(n => n.email.toLowerCase() === email.toLowerCase());
    if (!exists) {
      store.newsletters.push({ email, subscribedAt: new Date().toISOString() });
      writeStore(store);
    }
    return true;
  }
};

const Contact = {
  async add(msg) {
    const store = readStore();
    if (!store.contactMessages) store.contactMessages = [];
    const record = { id: 'msg_' + Date.now(), ...msg, createdAt: new Date().toISOString() };
    store.contactMessages.push(record);
    writeStore(store);
    return record;
  }
};

// Initialize persistent store on load
readStore();

module.exports = {
  Users,
  Products,
  Orders,
  Newsletters,
  Contact,
  readStore,
  seedMongoIfNeeded
};
