require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const jwt = require('jsonwebtoken');
require('./passport-setup');

const authRoutes = require('./routes/authRoutes');
const gifRoutes = require('./routes/gifRoutes');
const User = require('./models/User');
const userRoutes = require('./routes/userRoutes');



const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
}));
app.use(express.json());
app.use(passport.initialize());



app.use('/auth', authRoutes);
app.use('/api/gifs', gifRoutes);
app.use('/api/user', userRoutes);
app.get('/auth/me', async (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No token' });
    }
    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_jwt_secret');
        const user = await User.findById(decoded.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(403).json({ message: 'Invalid token' });
    }
});
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB connected');
        app.listen(5000, () => console.log('Server running at http://localhost:5000'));
    })
    .catch((err) => console.error('MongoDB connection error:', err));
