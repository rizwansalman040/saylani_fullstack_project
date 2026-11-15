const express = require('express');
const router = express.Router();
const { placeOrder, getMyOrders } = require('../controllers/orderController');
const { protectUser } = require('../controllers/userAuthController');

// Protect both routes so only verified users can order or view their history
router.post('/', protectUser, placeOrder);
router.get('/myorders', protectUser, getMyOrders);

module.exports = router;