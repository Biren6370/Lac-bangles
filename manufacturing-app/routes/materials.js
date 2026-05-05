const express = require('express');
const router = express.Router();
const Materials = require('../models/Materials');

router.get('/', async (req, res) => {
  try {
    const records = await Materials.find().sort({ date: -1 });
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  const materials = new Materials(req.body);
  try {
    const newRecord = await materials.save();
    res.status(201).json(newRecord);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const record = await Materials.findById(req.params.id);
    if (!record) return res.status(404).json({ message: 'Record not found' });
    Object.assign(record, req.body);
    const updated = await record.save();
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
