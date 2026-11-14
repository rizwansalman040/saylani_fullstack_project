require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./db');

const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes'); // ADDED: Import the new user routes
const { seedAdmin } = require('./controllers/authController');

const app = express();

app.use(express.json());
app.use(cookieParser());

// Allow both localhost and your live Netlify domain
app.use(cors({
    origin: [
        'http://localhost:5173',
        'https://saylani-fullstack-project.netlify.app'
    ],
    credentials: true
}));

app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes); // ADDED: Activate the /api/users endpoints

app.get('/', (req, res) => {
    res.send('Saylani Fullstack API is live and running!');
});

const PORT = process.env.PORT || 5000;

// The Fix: Force Node.js to wait for the database connection BEFORE seeding
const startServer = async () => {
    try {
        await connectDB();
        await seedAdmin();
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    } catch (error) {
        console.error('Failed to connect to the database or start server:', error);
    }
};

startServer();