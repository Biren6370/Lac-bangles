const mongoose = require('mongoose');

const materialsSchema = new mongoose.Schema({
  date: { type: Date, required: true, default: Date.now },
  materialName: { type: String, required: true },
  category: { type: String, required: true },
  quantity: { type: Number, required: true },
  unit: { type: String, default: 'kg' },
  costPerUnit: { type: Number, required: true },
  supplier: String,
  status: { type: String, enum: ['In Stock', 'Low Stock', 'Out of Stock'], default: 'In Stock' },
  expiryDate: Date,
  notes: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Materials', materialsSchema);
