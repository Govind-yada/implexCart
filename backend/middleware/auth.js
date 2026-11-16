const jwt = require('jsonwebtoken');
const { Users } = require('../models/store');

const JWT_SECRET = process.env.JWT_SECRET || 'implexcart_super_secret_jwt_key_2026';

const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, JWT_SECRET);
      const user = await Users.findById(decoded.id);
      if (!user) {
        return res.status(401).json({ error: 'User not found or token invalid' });
      }
      req.user = {
        id: user.id || user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        wishlist: user.wishlist || []
      };
      return next();
    } catch (error) {
      return res.status(401).json({ error: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ error: 'Not authorized, no token provided' });
  }
};

const optionalAuth = async (req, res, next) => {
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, JWT_SECRET);
      const user = await Users.findById(decoded.id);
      if (user) {
        req.user = {
          id: user.id || user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          wishlist: user.wishlist || []
        };
      }
    } catch (e) {
      // Ignore invalid token for optional auth
    }
  }
  next();
};

module.exports = { protect, optionalAuth, JWT_SECRET };
