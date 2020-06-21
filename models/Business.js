// mongoDB schema for Businesses (edited)
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;
const secret = require('../config/default');

const BusinessSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
    // required: true,
    unique: true,
  },
  address: {
    type: String,
    // required: true,
    unique: true,
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    // required: true,
  },
  phone: {
    type: Number,
    // required: true,
    unique: true,
  },
  password: {
    type: String,
    // required: true,
    minlength: 4,
  },
  settings: {
    open: {
      type: Number,
      // required: true,
    },
    close: {
      type: Number,
      // required: true,
    },
    maxOccupancy: {
      type: Number,
      // required: true,
    },
  },
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

// Password Encryption before saving to Database
BusinessSchema.pre('save', function (next) {
  var business = this;
  if (business.isModified('password')) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);
      bcrypt.hash(business.password, salt, function (err, hash) {
        if (err) return next(err);
        business.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

// LogIn: Check if the password is not wrong
BusinessSchema.methods.comparePassword = function (plainPassword, cb) {
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

// LogIn: Generate token if the password is not wrong
BusinessSchema.methods.createToken = function (cb) {
  var business = this;
  var token = jwt.sign(business._id.toHexString(), secret.jwtSecret);
  business.token = token;
  business.save(function (err, business) {
    if (err) return cb(err);
    cb(null, business);
  });
};

// Authentification
BusinessSchema.statics.foundByToken = function (token, cb) {
  var business = this;
  jwt.verify(token, secret.jwtSecret, function (err, decoded) {
    business.findOne({ _id: decoded, token: token }, function (err, business) {
      if (err) return cb(err);
      cb(null, business);
    });
  });
};

module.exports = Business = mongoose.model('business', BusinessSchema);
