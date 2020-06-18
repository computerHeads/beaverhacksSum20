// mongoDB schema for Customers (edited)
const mongoose = require('mongoose');

const QueueSchema = new mongoose.Schema({
  business: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'business',
  },
  customers: [
    {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        unique: true,
      },
      phone: {
        type: String,
        required: true,
        unique: true,
      },
      entered: {
        type: Boolean,
        default: false,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

module.exports = Queue = mongoose.model('queue', QueueSchema);
