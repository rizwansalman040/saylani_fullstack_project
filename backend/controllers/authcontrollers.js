const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Auto-create the admin in the database if it doesn't exist
const seedAdmin = async () => {
    const adminExists = await Admin.findOne({ username: 'admin' });
    if (!adminExists) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('admin@123', salt);
        await Admin.create({ username: 'admin', password: hashedPassword });
        console.log('Admin account (admin / admin@123) secured in database.');
    }
};

const loginAdmin = async (req, res) => {
    const { username, password } = req.body;
    try {
        const admin = await Admin.findOne({ username });
        if (!admin) return res.status(401).json({ message: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Set HTTP-Only Cookie (No localStorage needed)
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // true for Render/Netlify
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            maxAge: 3600000 // 1 hour
        });

        res.status(200).json({ message: 'Logged in successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const verifyAdmin = (req, res) => {
    // If the middleware passes, the user is valid
    res.status(200).json({ message: 'Authenticated' });
};

const logoutAdmin = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out' });
};

module.exports = { seedAdmin, loginAdmin, verifyAdmin, logoutAdmin };