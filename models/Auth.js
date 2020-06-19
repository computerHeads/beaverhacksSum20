const Business = require('./Business');

let Auth = (req, res, next) => {
<<<<<<< HEAD
=======

>>>>>>> e1b49c7f4149afc129e06fc497c2ccc62776211c
    let token = req.cookies.qu_auth;
    Business.foundByToken(token, (err, business) => {
        if (err) throw err;
        if (!business) return res.json({isAuth: false, error: true});
        req.token = token;
        req.business = business;
        next();
    });
}
<<<<<<< HEAD
=======

>>>>>>> e1b49c7f4149afc129e06fc497c2ccc62776211c

module.exports = Auth;
