require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');

const app = express();
const allowedOrigins = [
  'https://your-buddy.netlify.app', // Netlify frontend
  'http://localhost:3000'           // Local development
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

// Handle preflight requests for all routes
app.options('*', cors());
app.use(express.json());

console.log("Registering authRoutes at /api/auth");
app.use('/api/auth', authRoutes);

const serviceRoutes = require('./routes/services');
console.log("Registering serviceRoutes at /api/services");
app.use('/api/services', serviceRoutes);

const paymentRoutes = require('./routes/payment');
console.log("Registering paymentRoutes at /api/payment");
app.use('/api/payment', paymentRoutes);


mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(5000, () => console.log('Server running')))
  .catch(err => console.log(err));