const express = require('express');
const router = express.Router();
const Queue = require('../models/Queue');
const Business = require('../models/Business');
const sendEmail = require('../public/notifications/email.js');
const sendSMS = require('../public/notifications/sms.js');
const Auth = require('../models/Auth');

// GET route to load manager page
router.get('/:business_id', Auth, async (req, res) => {
  try {
    const business = await Business.findById({
      _id: req.params.business_id,
    }).select('-password');
    if (!business) {
      return res.status(400).json({ msg: 'business not found' });
    }
    const payload = {};
    let queue = await Queue.findOne({ business: req.params.business_id });
    if (!queue) {
      payload.business = req.params.business_id;
      queue = new Queue(payload);
      await queue.save();
    }
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
    payload.tally = q.tally;
    payload.wait = wait;
    payload.current = current;
    payload.biz = biz;
    payload.customers = q.customers;
    payload.logout = true;
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
  try {
    let queue = await Queue.findOneAndUpdate(
      { 'customers._id': id },
      {
        $set: { 'customers.$.entered': true, 'customers.$.waiting': false },
        $inc: { tally: +1 },
      }
    );
    if (!queue) {
      console.error(error.message);
      return res.status(400).json({ msg: 'Error: no matching customer found' });
    }
    var total = queue.customers.length;
    var current = 0;
    for (var i = 0; i < total; i++) {
      if (queue.customers[i].entered === true) {
        current++;
      }
    }
    var wait = total - current;
    var payload = {};
    payload.current = current + 1;
    payload.wait = wait - 1;
    payload.tally = queue.tally + 1;
    res.json(payload);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// Delete route for removing customer from queue if they don't show
router.delete('/:business_id', async (req, res) => {
  const { id, email, phone, name, businessId } = req.body;
  console.log(req.body);
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
