const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register a new customer
const registerUser = async (req, res) => {
    const { username, password } = req.body;
    
    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already taken' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({ 
            username, 
            password: hashedPassword 
        });

        // The newUser._id is the hidden ID your teacher mentioned
        res.status(201).json({ message: 'Account created successfully', userId: newUser._id });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Login for customers
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
            maxAge: 86400000 // 24 hours
        });

        res.status(200).json({ message: 'Logged in successfully', username: user.username });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Logout the customer
const logoutUser = (req, res) => {
    res.clearCookie('userToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
    });
    res.status(200).json({ message: 'Logged out successfully' });
};

// Check if a customer has a valid login session
const verifyUser = (req, res) => {
    // Notice it looks for 'userToken' instead of 'token' to keep admins and users separate
    const token = req.cookies?.userToken;
    
    if (!token) {
        return res.status(401).json({ message: 'Not authenticated' });
    }
    
    try {
        jwt.verify(token, process.env.JWT_SECRET);
        res.status(200).json({ message: 'Authenticated' });
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = { registerUser, loginUser, logoutUser, verifyUser };