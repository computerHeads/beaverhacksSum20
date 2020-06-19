const express = require('express');
const router = express.Router();
const Queue = require('../models/Queue');
const Business = require('../models/Business');

// default route when first arriving on page
// loads business data & form for customer entry
// route : /:business_id -> placeholder
router.get('/:business_id', async (req, res) => {
  try {
    var payload = {};
    let business = await Business.findById({
      _id: req.params.business_id,
    }).select('-password');
    business = business.toJSON(); // convert to json obj due to new security update in hbs
    if (!business) {
      return res.status(400).json({ msg: 'Error: could not find business' });
    }
    let queue = await Queue.findOne({ business: req.params.business_id });
    // first use and queue does not exist yet
    if (!queue) {
      payload.business = req.params.business_id;
      queue = new Queue(payload);
      await queue.save();
    }
    queue = queue.toJSON(); // convert to json obj due to new security update in hbs
    var inside = 0;
    var count = 0;
    if (queue.customers.length > 0) {
      for (var i = 0; i < queue.cusomters.length; i++) {
        if (queue.customer[i].entered == true) {
          inside++;
        }
        count++;
      }
    }
    payload.wait = count - inside;
    payload.business = business;
    console.log(payload);
    res.render('addCustomer', payload);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// router for receiving customer data
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
