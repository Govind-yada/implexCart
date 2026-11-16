const { Orders } = require('../models/store');

const generateOrderId = () => {
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `IMP-${new Date().getFullYear()}-${randomNum}`;
};

// @desc    Create a new order
// @route   POST /api/orders
const createOrder = async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod, currency } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Order must contain at least one item.' });
    }

    if (!shippingAddress || !shippingAddress.fullName || !shippingAddress.street || !shippingAddress.city || !shippingAddress.zipCode) {
      return res.status(400).json({ error: 'Please provide a complete shipping address.' });
    }

    const subtotal = items.reduce((sum, item) => sum + (Number(item.price) * Number(item.quantity)), 0);
    const shippingFee = subtotal > 499 ? 0 : 49;
    const total = subtotal + shippingFee;

    const orderId = generateOrderId();
    const userPayload = req.user ? {
      userId: req.user.id,
      name: req.user.name,
      email: req.user.email,
      phone: req.user.phone || shippingAddress.phone || ''
    } : {
      name: shippingAddress.fullName,
      email: shippingAddress.email || 'customer@implexcart.online',
      phone: shippingAddress.phone || ''
    };

    const newOrder = await Orders.create({
      orderId,
      user: userPayload,
      items,
      shippingAddress,
      paymentMethod: paymentMethod || 'upi',
      paymentStatus: 'completed',
      orderStatus: 'Order Placed',
      pricing: {
        subtotal: parseFloat(subtotal.toFixed(2)),
        discount: 0,
        shippingFee: parseFloat(shippingFee.toFixed(2)),
        total: parseFloat(total.toFixed(2)),
        currency: currency || 'USD'
      },
      timeline: [
        {
          status: 'Order Placed',
          timestamp: new Date().toISOString(),
          message: 'Your order has been placed and payment has been verified.'
        },
        {
          status: 'Processing',
          timestamp: new Date().toISOString(),
          message: 'Items are being packed and inspected in our fulfillment facility.'
        }
      ]
    });

    res.status(201).json({
      success: true,
      message: 'Order placed successfully!',
      order: newOrder
    });
  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({ error: 'Failed to place order. Please try again.' });
  }
};

// @desc    Get user order history
// @route   GET /api/orders/my-orders
const getMyOrders = async (req, res) => {
  try {
    const orders = await Orders.findByUser(req.user.id, req.user.email);
    res.json({ success: true, count: orders.length, orders });
  } catch (error) {
    console.error('Fetch orders error:', error);
    res.status(500).json({ error: 'Failed to retrieve order history.' });
  }
};

// @desc    Track order by orderId
// @route   GET /api/orders/track/:orderId
const trackOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    if (!orderId) {
      return res.status(400).json({ error: 'Order ID is required.' });
    }

    const order = await Orders.findByOrderId(orderId.trim());
    if (!order) {
      return res.status(404).json({
        error: `Order #${orderId} was not found. Please verify the ID from your receipt or confirmation email.`
      });
    }

    res.json({ success: true, order });
  } catch (error) {
    console.error('Track order error:', error);
    res.status(500).json({ error: 'Failed to track order.' });
  }
};

module.exports = {
  createOrder,
  getMyOrders,
  trackOrder
};
