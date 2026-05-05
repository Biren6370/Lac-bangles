const mongoose = require('mongoose');

const qualitySchema = new mongoose.Schema({
  date: { type: Date, required: true, default: Date.now },
  batchNumber: { type: String, required: true },
  testType: { type: String, required: true },
  result: { type: String, enum: ['Pass', 'Fail', 'Pending'], required: true },
  defectsFound: Number,
  remarks: String,
  testedBy: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Quality', qualitySchema);
