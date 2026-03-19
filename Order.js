const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    price: {
      type: Number,
      required: true
    }
  }],
  shippingAddress: {
    name: String,           // Added name
    street: String,
    locality: String,       // Added locality/apartment
    city: String,           // Keep city/state if you want
    state: String,
    zipCode: String,
    phone: String           // Added phone
  },
  deliveryDate: String,     // New field (string or Date)
  timeSlot: String,         // New field (string)
  paymentMethod: {
    type: String,
    required: true,
    enum: ['credit_card', 'debit_card', 'net_banking', 'COD'], // Added 'COD'
    default: 'COD'
  },
  paymentStatus: {
    type: String,
    required: true,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending'
  },
  orderStatus: {
    type: String,
    required: true,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  totalAmount: {
    type: Number,
    required: true
  },
  trackingNumber: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Order', orderSchema);
