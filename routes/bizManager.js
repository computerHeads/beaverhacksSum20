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
    console.log(biz);
    payload.biz = biz;
    payload.customers = queue.customers;
    // console.log(payload);
    res.render('manager', payload);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// PUT route for updating the customer list (marking customers as "entered")
router.put('/:business_id', async (req, res) => {
  const { customerId } = req.body;
  try {
    let queue = await Queue.findOneAndUpdate(
      { 'customers._id': customerId },
      { $set: { 'customers.$.entered': true } }
    );
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
  const { customerId, name, email, phone, businessName } = req.body;
  try {
    let queue = await Queue.findOneAndUpdate(
      { business: businessId },
      { $pull: { customers: { _id: customerId } } }
    );
    if (!queue) {
      console.error(error.message);
      return res.status(400).json({ msg: 'Error: no matching customer found' });
    }
    res.send(true);
    const message = `${name}, thank you for visiting ${business.name}. We hope to see you again!`;
    sendEmail.notify(name, email, businessName, message);
    sendSMS.send(phone, message);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
