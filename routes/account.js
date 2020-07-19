const express = require('express');
const router = express.Router();
const Business = require('../models/Business');

router.post('/create-account', async (req, res) => {
    const business = new Business(req.body);
    business.save((error, businessInfo) => {
        if (error) return res.json({ msg: 'Error: Create Account Page Not Found'});
        return res.status(200).json({
            isSignUp: "true"
        }); 
    });
});

module.exports = router;