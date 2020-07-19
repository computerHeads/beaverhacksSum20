// mongoDB schema for Customers (edited)
const mongoose = require('mongoose');

const QueueSchema = new mongoose.Schema({
  business: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'business',
  },
  tally: {
    type: Number,
    default: 0,
  },
  customers: [
    {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
      },
      phone: {
        type: String,
        required: true,
      },
      entered: {
        type: Boolean,
        default: false,
      },
      waiting: {
        type: Boolean,
        default: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

module.exports = Queue = mongoose.model('queue', QueueSchema);
