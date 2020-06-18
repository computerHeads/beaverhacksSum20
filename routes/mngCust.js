const express = require('express');
const router = express.Router();
const Queue = require('../models/Queue');
const Business = require('../models/Business');

// GET route to load manager page
router.get('/manager/:business_id', async (req, res) => {
  try {
    const business = await Business.findOne({ business: req.params.business_id });
    if(!business){ 
      return res.status(400).json({ msg: 'business not found'})
    } else {
      res.json(business);
    }
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ msg: 'Error: no matching business found' });
  }
  const {name, open, close, maxOccupancy}
});

// PUT route for updating the customer list (includes marking custers as "entered")
router.put('/', async (req, res) => {
  const { businessId, customerId } = req.body;
  try {
    let queue = await Queue.findOne({ business: businessId }); // find a matching queue with the businessId
    queue = await Queue.findOneAndUpdate(
      { customers: customerId },
      { entered: true }
    ); // update entered value to true  *not sure if this works need to see data in db*
    res.json({ msg: 'customer marked, entered' });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ msg: 'Error: no matching customer found' });
  }
});

// Delete route for removing customer from queue if they don't show
router.delete('/', async (req, res) => {
  const { businessId, customerId } = req.body;
  try {
    let queue = await Queue.findOne({ business: businessId }); // find a matching queue with the businessId
    queue = await Queue.findOneAndDelete({ customers: customerId }); // update entered value to true  *not sure if this works need to see data in DB*
    res.json({ msg: 'customer deleted' });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ msg: 'Error: no matching customer found' });
  }
});

module.exports = router;
