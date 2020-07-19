const express = require('express');
const router = express.Router();
const Business = require('../models/Business');
const Auth = require('../models/Auth');


router.get('/auth', Auth, (req, res) => {
    const business = new Business(req.body);
    res.status(200).json({
        _id: req.business._id,
        isAuth: true,
        name: req.business.name,
        email: req.business.email,
        settings: {
            businessName: req.business.settings.businessName,
            address: req.business.settings.address,
        },
    })
})

module.exports = router;