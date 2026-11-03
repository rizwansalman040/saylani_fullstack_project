require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./db');

const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const { seedAdmin } = require('./controllers/authController');

connectDB();

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

seedAdmin();

app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));