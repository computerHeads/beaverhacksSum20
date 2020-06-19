const express = require('express');
const router = express.Router();
const Business = require('../models/Business');

router.post('/login', async (req, res) => {
    Business.findOne({email: req.body.email}, (err, business) => {
        if (!business) {
            return res.json({ msg: "Failed to LogIn. No user using that email!" });
        }
        business.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch) {
                return res.json({ msg: "Failed to LogIn. Wrong Password!"});
            }
            business.createToken((err, business) => {
                if (err) return res.status(400).send(err);
                res.cookie("qu_auth", business.token).status(200).json({
                    msg: "Success to LogIn!"
                });
            });
        });
    });
});

module.exports = router;