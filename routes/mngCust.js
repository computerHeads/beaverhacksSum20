const express = require('express');
const router = express.Router();

// test route to see if it works
router.get('/manager', (req, res) => {
  res.send('manage customers page');
});

// PUT route for updating the customer list (includes marking custers as "entered")
router.put('/', async (req, res) => {
  try {
  } catch (error) {}
});

module.exports = router;
