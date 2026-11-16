const express = require('express');
const router = express.Router();
const { createOrder, getMyOrders, trackOrder } = require('../controllers/orderController');
const { protect, optionalAuth } = require('../middleware/auth');

router.post('/', optionalAuth, createOrder);
router.get('/my-orders', protect, getMyOrders);
router.get('/track/:orderId', trackOrder);

module.exports = router;
