const express = require('express');
const router = express.Router();
const { loginAdmin, verifyAdmin, logoutAdmin } = require('../controllers/authController');

// Admin Authentication Routes
router.post('/login', loginAdmin);
router.post('/logout', logoutAdmin);
router.get('/verify', verifyAdmin);

module.exports = router;