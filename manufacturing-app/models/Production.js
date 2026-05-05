const mongoose = require('mongoose');

const productionSchema = new mongoose.Schema({
  date: { type: Date, required: true, default: Date.now },
  batchNumber: { type: String, required: true, unique: true },
  productName: { type: String, required: true },
  quantity: { type: Number, required: true },
  unit: { type: String, default: 'pieces' },
  status: { type: String, enum: ['Planned', 'In Progress', 'Completed', 'Quality Check'], default: 'Planned' },
  startTime: Date,
  endTime: Date,
  notes: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Production', productionSchema);
