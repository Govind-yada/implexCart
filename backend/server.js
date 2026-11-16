const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const { connectDB, getDBMode } = require('./config/db');
const { seedMongoIfNeeded } = require('./models/store');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB or activate High-Performance persistent JSON store
connectDB().then(() => {
  seedMongoIfNeeded();
});

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health / Status Check
app.get('/api/status', (req, res) => {
  res.json({
    platform: 'IMPLEX CART INTERNATIONAL — Har Ghar Ki Smart Shopping',
    version: '1.0.0',
    status: 'online',
    dbEngine: getDBMode(),
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/misc', require('./routes/miscRoutes'));

// Serve frontend production build if present
const frontendDist = path.join(__dirname, '..', 'frontend', 'dist');
app.use(express.static(frontendDist));

app.get('*', (req, res) => {
  const indexHtml = path.join(frontendDist, 'index.html');
  res.sendFile(indexHtml, (err) => {
    if (err) {
      res.status(200).send(`
        <!DOCTYPE html>
        <html>
        <head><title>Implex Cart API</title></head>
        <body style="font-family:sans-serif;text-align:center;padding:50px;">
          <h1>Implex Cart API Server is Running</h1>
          <p>Database Engine: <b>${getDBMode()}</b></p>
          <p>Frontend is currently building or starting up.</p>
        </body>
        </html>
      `);
    }
  });
});

// Start Server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`=======================================================`);
  console.log(`🚀 IMPLEX CART INTERNATIONAL BACKEND IS LIVE`);
  console.log(`📡 URL: http://0.0.0.0:${PORT}`);
  console.log(`💾 Database Engine: ${getDBMode()}`);
  console.log(`=======================================================`);
});

module.exports = app;
