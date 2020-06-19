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
        address: req.business.address,
        email: req.business.email,
        phone: req.business.phone,
    })
})

module.exports = router;