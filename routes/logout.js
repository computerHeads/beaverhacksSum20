const express = require('express');
const router = express.Router();
const Business = require('../models/Business');
const Auth = require('../models/Auth');

router.get('/logout', Auth, async (req, res) => {
    Business.findOneAndUpdate({_id: req.business._id}, {token: ""}, (err, business) => {
        if (err) return res.json({ logOut: false, err });
        return res.status(200).send({ logOut: true});
    });
});

module.exports = router;