require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./db');

const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
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

app.get('/', (req, res) => {
    res.send('Saylani Fullstack API is live and running!');
});

const PORT = process.env.PORT || 5000;

// CRITICAL: Wrap startup in an async function to guarantee order
const startServer = async () => {
    try {
        await connectDB(); // 1. Wait for MongoDB to connect entirely
        await seedAdmin(); // 2. Safely run the seeder ONLY after connection is ready

        // 3. Finally, start accepting web traffic
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    } catch (error) {
        console.error('Failed to connect to the database or start server:', error);
    }
};

startServer();