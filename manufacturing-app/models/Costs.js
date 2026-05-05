const mongoose = require('mongoose');

const costsSchema = new mongoose.Schema({
  date: { type: Date, required: true, default: Date.now },
  category: { type: String, required: true, enum: ['Materials', 'Labor', 'Utilities', 'Packaging', 'Other'] },
  amount: { type: Number, required: true },
  description: String,
  batchNumber: String,
  notes: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Costs', costsSchema);
