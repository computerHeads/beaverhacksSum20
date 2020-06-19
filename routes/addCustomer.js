const express = require('express');
const router = express.Router();
const Queue = require('../models/Queue');
const Business = require('../models/Business');

// route : /?id = :business_id
router.get('/add', async (req, res) => {
  try {
    var payload = {};
    let business = await Business.findOne({ business: req.query.id });
    if (!business) {
      return res.status(400).json({ msg: 'Error: could not find business' });
    }
    let queue = await Business.findOne({ business: req.query.id });
    // first use and queue does not exist yet
    if (!queue) {
      payload.business = req.query.id;
      queue = new Queue(payload);
      await queue.save();
    }
    payload.business = business;
    payload.queue = queue; // change this, don't need to send entire queue
    res.render('addCustomer', payload);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
