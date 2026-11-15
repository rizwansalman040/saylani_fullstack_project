const express = require('express');
const router = express.Router();
const { 
    registerUser, 
    loginUser, 
    logoutUser, 
    verifyUser, 
    protectUser, 
    getProfile, 
    updateProfile 
} = require('../controllers/userAuthController');

// Import the Cloudinary upload middleware
const upload = require('../middleware/upload');

// Customer Authentication Routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/verify', verifyUser);

// Secure Profile Management Routes
// protectUser ensures only the logged-in user can access or edit their own data
router.get('/profile', protectUser, getProfile);
router.put('/profile', protectUser, upload.single('profileImage'), updateProfile);

module.exports = router;