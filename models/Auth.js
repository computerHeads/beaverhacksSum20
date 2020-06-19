const Business = require('./Business');

let Auth = (req, res, next) => {

    let token = req.cookies.qu_auth;
    Business.foundByToken(token, (err, business) => {
        if (err) throw err;
        if (!business) return res.json({isAuth: false, error: true});
        req.token = token;
        req.business = business;
        next();
    });
}


module.exports = Auth;
