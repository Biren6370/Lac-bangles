const express = require('express');
const router = express.Router();
const Production = require('../models/Production');

// Get all production records
router.get('/', async (req, res) => {
  try {
    const records = await Production.find().sort({ date: -1 });
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create production record
router.post('/', async (req, res) => {
  const production = new Production(req.body);
  try {
    const newRecord = await production.save();
    res.status(201).json(newRecord);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update production record
router.patch('/:id', async (req, res) => {
  try {
    const record = await Production.findById(req.params.id);
    if (!record) return res.status(404).json({ message: 'Record not found' });
    Object.assign(record, req.body);
    record.updatedAt = new Date();
    const updated = await record.save();
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete production record
router.delete('/:id', async (req, res) => {
  try {
    await Production.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
