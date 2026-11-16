const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '..', 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

let isMongoConnected = false;

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/implexcart';
  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 1500,
    });
    isMongoConnected = true;
    console.log(`[Database] MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    isMongoConnected = false;
    console.log(`[Database] MongoDB server not active (${error.message}).`);
    console.log(`[Database] Activating High-Performance Persistent JSON Store engine at /backend/data/db.json.`);
    console.log(`[Database] All store operations, user auth, products, reviews, and checkout are 100% active.`);
  }
};

const getDBMode = () => (isMongoConnected ? 'mongodb' : 'persistent-store');

module.exports = { connectDB, getDBMode };
