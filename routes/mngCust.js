const express = require('express');
const router = express.Router();
const Queue = require('../models/Queue');
const Business = require('../models/Business');
const Setting = require('../models/Setting');

// GET route to load manager page
router.get('/manager/:business_id', async (req, res) => {
  try {
    const business = await Business.findOne({
      business: req.params.business_id,
    });
    const setting = await Setting.findOne({ business: req.params.business_id });
    if (!business) {
      return res.status(400).json({ msg: 'business not found' });
    } else if (!setting) {
      return res.status(400).json({ msg: 'settings not found' });
    } else {
      res.json(business, setting);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// PUT route for updating the customer list (includes marking custers as "entered")
router.put('/', async (req, res) => {
  const { businessId, customerId } = req.body;
  try {
    let queue = await Queue.findOne({ business: businessId }); // find a matching queue with the businessId
    if (!queue) {
      console.error(error.message);
      return res.status(400).json({ msg: 'Error: no matching customer found' });
    }
    queue = await Queue.findOneAndUpdate(
      { customers: customerId },
      { entered: true }
    ); // update entered value to true  *not sure if this works need to see data in db*
    res.json({ msg: 'customer marked, entered' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// Delete route for removing customer from queue if they don't show
router.delete('/', async (req, res) => {
  const { businessId, customerId } = req.body;
  try {
    let queue = await Queue.findOne({ business: businessId }); // find a matching queue with the businessId
    if (!queue) {
      console.error(error.message);
      return res.status(400).json({ msg: 'Error: no matching customer found' });
    }
    queue = await Queue.findOneAndDelete({ customers: customerId }); // update entered value to true  *not sure if this works need to see data in DB*
    res.json({ msg: 'customer deleted' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
