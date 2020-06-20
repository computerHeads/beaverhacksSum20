const express = require('express');
const router = express.Router();
const Queue = require('../models/Queue');
const Business = require('../models/Business');
const sendEmail = require('../public/notifications/email.js');
const secret = require('../config/default.js');
const client = require('twilio')(secret.accountSid, secret.authToken);

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

// router for receiving customer data (make a reservation)
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
      res.json(payload);

      // send notifications (SMS and Email)
      //add date and time of reservation
      var message = `Hello ${name}, this is a reminder of your reservation for entry to ${business.name}. Please follow the link below to edit or cancel your reservation`;
      sendEmail.notify(name, email, business.name, message);
      client.messages.create({
        body: `Thank you ${name}! Your reservation has been confirmed. You will recevive another txt when it'ss your turn to enter the store`,
        from: '+12029463457',
        to: phone,
      });
      // .then((message) => console.log(message.sid));
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
  const { name, phone, email, customerId } = req.body;
  try {
    let queue = await Queue.findOneAndUpdate(
      { 'customers._id': customerId },
      {
        $set: {
          'customers.$.name': name,
          'customers.$.phone': phone,
          'customers.$.email': email,
        },
      }
    );
    // send sms and/or email to notify they have updated the reservation
    var message = `${name}, our reservation for ${business.name} has been updated to`;
    sendEmail.notify(name, email, business.name, message);
    client.messages.create({
      body: `This is confirmation that your reservation ${business.name} has been updated`,
      from: '+12029463457',
      to: phone,
    });
    res.send('yay');
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// route for deleting a reservation
router.delete('/:business_id', async (req, res) => {
  const { name, phone, email, customerId, businessId } = req.body;
  try {
    await Queue.findOneAndUpdate(
      { business: businessId },
      { $pull: { customers: { _id: customerId } } }
    );
    res.send('You have been removed from the wait list');

    let business = await Business.findById({ _id: businessId });

    // send sms and/or email to notify they have been deleted
    var message = `${name}, our reservation for ${business.name} has been canceled`;
    sendEmail.notify(name, email, business.name, message);
    client.messages.create({
      body: `This is confirmation that your reservation ${business.name} has been canceled`,
      from: '+12029463457',
      to: phone,
    });
    // .then((message) => console.log(message.sid));
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
