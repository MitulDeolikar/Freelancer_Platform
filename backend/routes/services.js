const express = require('express');
const jwt = require('jsonwebtoken');
const Service = require('../models/Service');
const router = express.Router();

// Middleware to verify JWT and get user ID
function auth(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ msg: 'No token' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch {
    res.status(401).json({ msg: 'Invalid token' });
  }
}

// Add a new service
router.post('/', auth, async (req, res) => {
  const { title, skills, description, price } = req.body;
  try {
    const service = await Service.create({
      user: req.userId,
      title,
      skills,
      description,
      price
    });
    res.json(service);
  } catch (err) {
    res.status(500).json({ msg: 'Could not add service' });
  }
});

// Get all services for the logged-in user
router.get('/my', auth, async (req, res) => {
  try {
    const services = await Service.find({ user: req.userId });
    res.json(services);
  } catch {
    res.status(500).json({ msg: 'Could not fetch services' });
  }
});

// Get all services (for browse page)
router.get('/', async (req, res) => {
  try {
    const query = {};
    if (req.query.user) {
      query.user = req.query.user;
    }
    const services = await Service.find(query).populate('user', 'firstName lastName email');
    res.json(services);
  } catch {
    res.status(500).json({ msg: 'Could not fetch services' });
  }
});

// backend/routes/services.js
router.delete('/:id', auth, async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) return res.status(404).json({ msg: 'Service not found' });
    res.json({ msg: 'Service deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;