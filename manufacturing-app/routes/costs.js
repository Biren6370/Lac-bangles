const express = require('express');
const router = express.Router();
const Costs = require('../models/Costs');

router.get('/', async (req, res) => {
  try {
    const records = await Costs.find().sort({ date: -1 });
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  const costs = new Costs(req.body);
  try {
    const newRecord = await costs.save();
    res.status(201).json(newRecord);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
