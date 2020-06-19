const express = require('express');
const router = express.Router();
const Queue = require('../models/Queue');
const Business = require('../models/Business');

// default route when first arriving on page
// route : /?id = :business_id
router.get('/', async (req, res) => {
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

router.post('/', async (req, res) => {
  const { businiessId, name, phone, email } = req.body;
  const customerInfo = {};
  customerInfo.name = name;
  customerInfo.phone = phone;
  customerInfo.email = email;

  try {
    let queue = await Queue.findOne({ business: businiessId });
    if (queue) {
      queue = await Queue.findByIdAndUpdate(
        { business: businiessId },
        { $push: customerInfo }
      );
      queue = await Queue.findOne({ business: businiessId });
      res.json(queue); // don't need to send whole q back
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});
module.exports = router;
