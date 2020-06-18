const express = require('express');
const router = express.Router();

router.post('/newCust', (req, res) => {
  res.send('new customers page');
});

module.exports = router;
