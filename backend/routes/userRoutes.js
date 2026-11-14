const express = require('express');
const router = express.Router();
const { registerUser, loginUser, logoutUser, verifyUser } = require('../controllers/userAuthController');

// Customer Authentication Routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/verify', verifyUser);

module.exports = router;