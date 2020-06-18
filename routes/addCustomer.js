const express = require('express');
const router = express.Router();
const Queue = require('../models/Queue');
const Business = require('../models/Business');

router.get('/:business_id', async (req, res) => {
  try {
    let business = await Business.findOne({ business: req.business.id });
    if (!business) {
      return res.status(400).json({ msg: 'Error: could not find business' });
    }
    res.json(business);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
