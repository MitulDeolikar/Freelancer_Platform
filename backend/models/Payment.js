const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
  paidTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },   // Freelancer
  paidBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },   // Client
  razorpayPaymentId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Payment', paymentSchema);