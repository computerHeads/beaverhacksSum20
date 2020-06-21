const Business = require('./Business');

let Auth = (req, res, next) => {
    let token = req.cookies.qu_auth;
    Business.foundByToken(token, (err, business) => {
        if (err) throw err;
        if (!business) return res.json({isAuth: false, error: true, msg: "To go to Manager Portal, please Login at QUEUEUE website! and try again! See you soooooon :)"});
        req.token = token;
        req.business = business;
        next();
    });
}

module.exports = Auth;
