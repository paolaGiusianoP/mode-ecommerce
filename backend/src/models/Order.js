const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  productName: String,
  productPrice: Number,
  quantity: Number,
  frontImg: String
});

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    unique: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [orderItemSchema],
  subtotal: {
    type: Number,
    required: true
  },
  shipping: {
    type: Number,
    default: 5
  },
  tax: {
    type: Number,
    default: 11
  },
  total: {
    type: Number,
    required: true
  },
  shippingAddress: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  paymentMethod: {
    type: String,
    enum: ['Direct Bank Transfer', 'Check Payments', 'Cash on delivery', 'Paypal'],
    default: 'Cash on delivery'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending'
  },
  orderStatus: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Generar número de orden automático
orderSchema.pre('save', async function(next) {
  if (!this.orderNumber) {
    const date = new Date();
    const random = Math.floor(Math.random() * 10000);
    this.orderNumber = `MODE-${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}-${random}`;
  }
  next();
});

module.exports = mongoose.model('Order', orderSchema);