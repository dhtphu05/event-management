// src/index.js
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './src/config/db.js';
import authRoutes from './src/routes/auth.route.js';
import userRoutes from './src/routes/user.route.js';
import eventRoutes from './src/routes/event.route.js';
import registrationRoutes from './src/routes/registration.route.js';
dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Connect to MongoDB
connectDB();

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/events', eventRoutes);
app.use('/events', registrationRoutes);

const PORT =  3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
