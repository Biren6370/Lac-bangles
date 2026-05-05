const express = require('express');
const router = express.Router();
const Production = require('../models/Production');
const Costs = require('../models/Costs');
const Labor = require('../models/Labor');
const Shipping = require('../models/Shipping');

// Daily Report
router.get('/daily', async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const production = await Production.find({ date: { $gte: today, $lt: tomorrow } });
    const costs = await Costs.find({ date: { $gte: today, $lt: tomorrow } });
    const labor = await Labor.find({ date: { $gte: today, $lt: tomorrow } });
    const shipping = await Shipping.find({ date: { $gte: today, $lt: tomorrow } });

    res.json({ production, costs, labor, shipping });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Monthly Report
router.get('/monthly', async (req, res) => {
  try {
    const month = req.query.month || new Date().getMonth() + 1;
    const year = req.query.year || new Date().getFullYear();
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 1);

    const production = await Production.find({ date: { $gte: startDate, $lt: endDate } });
    const costs = await Costs.find({ date: { $gte: startDate, $lt: endDate } });
    const labor = await Labor.find({ date: { $gte: startDate, $lt: endDate } });
    const shipping = await Shipping.find({ date: { $gte: startDate, $lt: endDate } });

    res.json({ production, costs, labor, shipping });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
