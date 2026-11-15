const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// --- EXISTING AUTH LOGIC ---
const registerUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) return res.status(400).json({ message: 'Username already taken' });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await User.create({ username, password: hashedPassword });

        res.status(201).json({ message: 'Account created successfully', userId: newUser._id });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(401).json({ message: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '24h' });

        res.cookie('userToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            maxAge: 86400000 
        });

        res.status(200).json({ message: 'Logged in successfully', username: user.username });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const logoutUser = (req, res) => {
    res.clearCookie('userToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
    });
    res.status(200).json({ message: 'Logged out successfully' });
};

const verifyUser = (req, res) => {
    const token = req.cookies?.userToken;
    if (!token) return res.status(401).json({ message: 'Not authenticated' });
    
    try {
        jwt.verify(token, process.env.JWT_SECRET);
        res.status(200).json({ message: 'Authenticated' });
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

// --- NEW PROFILE LOGIC ---

// Middleware to verify token and attach user ID to request
const protectUser = (req, res, next) => {
    const token = req.cookies?.userToken;
    if (!token) return res.status(401).json({ message: 'Not authorized, please log in' });
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Contains the user ID
        next();
    } catch (error) {
        res.status(401).json({ message: 'Session expired, please log in again' });
    }
};

// Fetch current user's data
const getProfile = async (req, res) => {
    try {
        // Find user by the ID embedded in their secure cookie, exclude the password
        const user = await User.findById(req.user.id).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Update profile text and image
const updateProfile = async (req, res) => {
    try {
        const { username, description } = req.body;
        const updateData = {};

        if (username) updateData.username = username;
        if (description !== undefined) updateData.description = description;
        
        // If Multer processed a file, req.file.path contains the live Cloudinary URL
        if (req.file) {
            updateData.profileImage = req.file.path;
        }

        const updatedUser = await User.findByIdAndUpdate(req.user.id, updateData, { new: true }).select('-password');
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update profile', error: error.message });
    }
};

module.exports = { registerUser, loginUser, logoutUser, verifyUser, protectUser, getProfile, updateProfile };