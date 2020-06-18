const express = require('express');
const router = express.Router();
const Queue = require('../models/Queue');

// test route to see if it works
router.get('/manager', (req, res) => {
  res.send('manage customers page');
});

// PUT route for updating the customer list (includes marking custers as "entered")
router.put('/', async (req, res) => {
  const { businessId, customerId } = req.body;
  try {
    const queue = await Queue.findOne({ business: businessId }); // find a matching queue with the businessId
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ msg: 'Error: no matching customer found' });
  }
});

module.exports = router;
