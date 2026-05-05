const express = require('express');
const router = express.Router();
const Production = require('../models/Production');
const Costs = require('../models/Costs');
const Labor = require('../models/Labor');
const Quality = require('../models/Quality');

// Production Analytics
router.get('/production', async (req, res) => {
  try {
    const total = await Production.countDocuments();
    const completed = await Production.countDocuments({ status: 'Completed' });
    const inProgress = await Production.countDocuments({ status: 'In Progress' });
    const avgQuantity = await Production.aggregate([
      { $group: { _id: null, avg: { $avg: '$quantity' } } }
    ]);

    res.json({ total, completed, inProgress, avgQuantity: avgQuantity[0]?.avg || 0 });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Cost Analytics
router.get('/costs', async (req, res) => {
  try {
    const totalCosts = await Costs.aggregate([
      { $group: { _id: '$category', total: { $sum: '$amount' } } }
    ]);

    res.json(totalCosts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Quality Analytics
router.get('/quality', async (req, res) => {
  try {
    const total = await Quality.countDocuments();
    const passed = await Quality.countDocuments({ result: 'Pass' });
    const failed = await Quality.countDocuments({ result: 'Fail' });
    const passRate = total > 0 ? ((passed / total) * 100).toFixed(2) : 0;

    res.json({ total, passed, failed, passRate });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Labor Analytics
router.get('/labor', async (req, res) => {
  try {
    const totalHours = await Labor.aggregate([
      { $group: { _id: null, total: { $sum: '$hoursWorked' } } }
    ]);
    const totalCost = await Labor.aggregate([
      { $group: { _id: null, total: { $sum: '$totalCost' } } }
    ]);

    res.json({ totalHours: totalHours[0]?.total || 0, totalCost: totalCost[0]?.total || 0 });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
