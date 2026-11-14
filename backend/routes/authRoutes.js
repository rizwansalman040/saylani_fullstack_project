const express = require('express');
const router = express.Router();
// This must perfectly match the exports from authController.js
const { loginAdmin, verifyAdmin, logoutAdmin } = require('../controllers/authController');

// Admin Authentication Routes
router.post('/login', loginAdmin);
router.post('/logout', logoutAdmin);
router.get('/verify', verifyAdmin);

module.exports = router;