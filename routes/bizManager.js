const express = require('express');
const router = express.Router();
const Queue = require('../models/Queue');
const Business = require('../models/Business');
const sendEmail = require('../public/notifications/email.js');
const sendSMS = require('../public/notifications/sms.js');

// GET route to load manager page
router.get('/:business_id', async (req, res) => {
  try {
    const business = await Business.findById({
      _id: req.params.business_id,
    }).select('-password');
    if (!business) {
      return res.status(400).json({ msg: 'business not found' });
    }
    let queue = await Queue.findOne({ business: req.params.business_id });
    const payload = {};
    const biz = business.toJSON();
    const q = queue.toJSON();
    let max = biz.settings.maxOccupancy;
    let current = 0;
    let count = q.customers.length;
    for (var i = 0; i < q.customers.length; i++) {
      if (q.customers[i].entered === true) {
        current++;
      }
    }
    let wait = count - current;
    if (wait < max) {
      wait = 0;
    }
    payload.biz = biz;
    payload.customers = q.customers;
    // console.log(payload);
    res.render('manager', payload);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// PUT route for updating the customer list (marking customers as "entered")
router.put('/:business_id', async (req, res) => {
  const { businessId, id } = req.body;
  console.log(req.body);
  try {
    let queue = await Queue.findOneAndUpdate(
      { 'customers._id': id },
      { $set: { 'customers.$.entered': true } }
    );
    console.log(queue);
    if (!queue) {
      console.error(error.message);
      return res.status(400).json({ msg: 'Error: no matching customer found' });
    }
    res.send(true);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// Delete route for removing customer from queue if they don't show
router.delete('/:business_id', async (req, res) => {
  const { id, email, phone, name, businessId } = req.body;
  try {
    await Queue.findOneAndUpdate(
      { business: businessId },
      { $pull: { customers: { _id: id } } }
    );
    res.send(true);
    const message = `${name}, thank you for visiting. We hope to see you again!`;
    sendEmail.notify(name, email, message);
    sendSMS.send(phone, message);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
