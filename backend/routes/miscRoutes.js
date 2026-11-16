const express = require('express');
const router = express.Router();
const { subscribeNewsletter, submitContact, getFAQs } = require('../controllers/miscController');

router.post('/newsletter', subscribeNewsletter);
router.post('/contact', submitContact);
router.get('/faqs', getFAQs);

module.exports = router;
