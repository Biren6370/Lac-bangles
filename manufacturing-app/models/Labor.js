const mongoose = require('mongoose');

const laborSchema = new mongoose.Schema({
  date: { type: Date, required: true, default: Date.now },
  employeeName: { type: String, required: true },
  role: String,
  hoursWorked: { type: Number, required: true },
  hourlyRate: { type: Number, required: true },
  totalCost: { type: Number, required: true },
  task: String,
  notes: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Labor', laborSchema);
