const express = require('express');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const Payment = require('../models/Payment');
const Service = require('../models/Service');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.REACT_APP_RAZORPAY_KEY_ID,
  key_secret: process.env.REACT_APP_RAZORPAY_KEY_SECRET
});

// Middleware to get user from token
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

// Create order route
router.post('/order', async (req, res) => {
  const { amount, currency, receipt } = req.body;

  try {
    const options = {
      amount: amount * 100,  // Razorpay accepts amount in paise
      currency: currency || "INR",
      receipt: receipt || `receipt_order_${Date.now()}`
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Failed to create Razorpay order' });
  }
});

// Record payment after success
router.post('/record', auth, async (req, res) => {
  const { amount, serviceId, razorpayPaymentId } = req.body;
  try {
    const service = await Service.findById(serviceId).populate('user');
    if (!service) return res.status(404).json({ msg: 'Service not found' });

    const payment = await Payment.create({
      amount,
      service: serviceId,
      paidTo: service.user._id,
      paidBy: req.userId,
      razorpayPaymentId
    });
    res.json(payment);
  } catch (err) {
    res.status(500).json({ msg: 'Could not record payment' });
  }
});

// Get orders for logged-in user
router.get('/my-orders', auth, async (req, res) => {
  try {
    const orders = await Payment.find({ paidBy: req.userId })
      .populate('service')
      .populate('paidTo', 'firstName lastName email');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ msg: 'Could not fetch orders' });
  }
});

router.get('/my-earnings', auth, async (req, res) => {
  try {
    const payments = await Payment.find({ paidTo: req.userId })
      .populate('service')
      .populate('paidBy', 'firstName lastName email');
    res.json(payments);
  } catch (err) {
    console.error("Error fetching earnings:", err);
    res.status(500).json({ msg: 'Could not fetch earnings' });
  }
});


router.get('/top-freelancers', async (req, res) => {
  try {
    const top = await Payment.aggregate([
      { $group: { _id: "$paidTo", hireCount: { $sum: 1 } } },
      { $sort: { hireCount: -1 } },
      { $limit: 6 },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user"
        }
      },
      { $unwind: "$user" },
      {
        $project: {
          _id: "$user._id",
          firstName: "$user.firstName",
          lastName: "$user.lastName",
          title: "$user.title",
          rate: "$user.rate",
          hireCount: 1
        }
      }
    ]);
    res.json(top);
  } catch (err) {
    res.status(500).json({ msg: "Could not fetch top freelancers" });
  }
});
// (Optional) You can add payment verification route later if needed.

module.exports = router;