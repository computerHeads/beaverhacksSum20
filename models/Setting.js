// mongoDB schema for Businesses (edited)
const mongoose = require('mongoose');

const SettingSchema = new mongoose.Schema({
  business: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'business',
  },
  oepn: {
    type: Number,
    required: true,
  },
  close: {
    type: Number,
    required: true,
  },
  maxOccupancy: {
    type: Number,
    required: true,
  },
});

module.exports = Setting = mongoose.model('setting', SettingSchema);
