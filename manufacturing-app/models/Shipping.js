const mongoose = require('mongoose');

const shippingSchema = new mongoose.Schema({
  date: { type: Date, required: true, default: Date.now },
  orderId: { type: String, required: true },
  batchNumber: String,
  customerName: String,
  quantity: { type: Number, required: true },
  destination: String,
  carrier: String,
  trackingNumber: String,
  status: { type: String, enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'], default: 'Pending' },
  cost: Number,
  notes: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Shipping', shippingSchema);
