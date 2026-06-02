const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: [true, 'El nombre del producto es requerido'],
    trim: true
  },
  productPrice: {
    type: Number,
    required: [true, 'El precio es requerido'],
    min: 0
  },
  frontImg: {
    type: String,
    required: [true, 'La imagen principal es requerida']
  },
  backImg: {
    type: String,
    default: ''
  },
  productReviews: {
    type: String,
    default: '0 reviews'
  },
  category: {
    type: String,
    default: 'Uncategorized'
  },
  inStock: {
    type: Boolean,
    default: true
  },
  stockQuantity: {
    type: Number,
    default: 10
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Product', productSchema);