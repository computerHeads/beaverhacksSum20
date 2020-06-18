const express = require('express');
const router = express.Router();

router.get('/manager', (req, res) => {
  res.send('manage customers page');
});

module.exports = router;
