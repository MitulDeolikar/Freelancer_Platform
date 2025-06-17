require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

const serviceRoutes = require('./routes/services');
app.use('/api/services', serviceRoutes);

const paymentRoutes = require('./routes/payment');
app.use('/api/payment', paymentRoutes);


mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(5000, () => console.log('Server running')))
  .catch(err => console.log(err));