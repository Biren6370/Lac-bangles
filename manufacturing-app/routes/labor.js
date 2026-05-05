const express = require('express');
const router = express.Router();
const Labor = require('../models/Labor');

router.get('/', async (req, res) => {
  try {
    const records = await Labor.find().sort({ date: -1 });
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  const labor = new Labor(req.body);
  try {
    const newRecord = await labor.save();
    res.status(201).json(newRecord);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const record = await Labor.findById(req.params.id);
    if (!record) return res.status(404).json({ message: 'Record not found' });
    Object.assign(record, req.body);
    const updated = await record.save();
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
