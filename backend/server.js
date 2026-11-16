require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./db');

const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes'); 
const orderRoutes = require('./routes/orderRoutes'); // ADDED: Import order routes
const { seedAdmin } = require('./controllers/authController');
const app = express();

app.use(express.json());
app.use(cookieParser());

// Render sits behind a proxy; needed so secure cookies work in production
app.set('trust proxy', 1);

// CORS must match the exact frontend origin (no wildcards, no bare netlify.app)
const allowedOrigins = [
    'http://localhost:5173',
    'https://saylani-fullstack-project.netlify.app',
    process.env.CLIENT_URL // optional: set on Render if the frontend URL changes
].filter(Boolean).map(o => o.replace(/\/$/, ''));

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
        return callback(new Error('Not allowed by CORS: ' + origin));
    },
    credentials: true
}));

app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes); // ADDED: Activate the /api/users endpoints
app.use('/api/orders', orderRoutes); // ADDED: Activate the /api/orders endpoints

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