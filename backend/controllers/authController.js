const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const seedAdmin = async () => {
    try {
        // The Fix: Use Render environment variables instead of hardcoded text
        const username = process.env.ADMIN_USERNAME || 'admin';
        const password = process.env.ADMIN_PASSWORD || 'admin@123';

        const adminExists = await Admin.findOne({ username });
        if (!adminExists) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            await Admin.create({ username, password: hashedPassword });
            console.log('Admin account securely seeded in database.');
        } else {
            console.log('Admin account already exists in database.');
        }
    } catch (error) {
        console.error('Error seeding admin:', error);
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

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', 
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            maxAge: 3600000 
        });

        res.status(200).json({ message: 'Logged in successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const verifyAdmin = (req, res) => {
    res.status(200).json({ message: 'Authenticated' });
};

const logoutAdmin = (req, res) => {
    // The Fix: Match the exact security rules to successfully clear the cookie
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
    });
    res.status(200).json({ message: 'Logged out' });
};

module.exports = { seedAdmin, loginAdmin, verifyAdmin, logoutAdmin };