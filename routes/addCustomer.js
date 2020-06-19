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
      for (var i = 0; i < queue.customers.length; i++) {
        if (queue.customers[i].entered == true) {
          inside++;
        }
        count++;
      }
    }
    payload.wait = count - inside;
    payload.business = business;
    // console.log(payload);
    res.render('addCustomer', payload);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// router for receiving customer data
router.post('/:business_id', async (req, res) => {
  // console.log(req.params.business_id);
  const { name, phone, email, businessId } = req.body;
  const customerInfo = {};
  customerInfo.customers = {};
  customerInfo.customers.name = name;
  customerInfo.customers.phone = phone;
  customerInfo.customers.email = email;
  try {
    let queue = await Queue.findOne({ business: businessId });
    if (queue) {
      queue = await Queue.findOneAndUpdate(
        { business: businessId },
        { $push: customerInfo }
      );
      queue = await Queue.findOne({ business: businessId });
      var customerId = queue.customers[queue.customers.length - 1].id; // get id of last customer added
      var inside = 0; // calc # of people currently inside
      for (var i = 0; i < queue.customers.length; i++) {
        if (queue.customers[i].entered == true) {
          inside++;
        }
      }
      let business = await Business.findById({ _id: businessId });
      var maxOccupancy = business.settings.maxOccupancy; // get maxOccupancy
      var wait = queue.customers.length - maxOccupancy - 1; // calc # of people infront of customers
      if (inside < maxOccupancy) {
        wait = 0;
      }
      payload = {};
      payload.customerId = customerId;
      payload.wait = wait;
      // console.log(payload);
      res.json(payload);
    } else {
      res.status(400).send('Could not find customer queue');
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// route for updating a reservation
router.put('/:business_id', async (req, res) => {
  const { name, phone, email, customerId, businessId } = req.body;
  customerInfo = {};
  customerInfo.customers = {};
  customerInfo.customers.name = name;
  customerInfo.customers.phone = phone;
  customerInfo.customers.email = email;

  try {
    let queue = await Queue.findOne({ business: businessId });
    await queue.customers.findOneAndUpdate(
      { _id: customerId },
      { $push: customerInfo }
    );
    res.send('yay');
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// route for deleting a reservation
router.delete('/:business_id', async (req, res) => {
  const { customerId, businessId } = req.body;
  console.log(req.body);
  try {
    console.log(customerId, businessId);
    let queue = await Queue.findOne({ business: businessId });
    queue.customers.findOneAndDelete({ _id: customerId });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
