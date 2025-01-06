const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  barcode: { type: String, required: true },
  description: { type: String, required: true },
  stockQuantity: { type: Number, required: true },
  category: { type: String, required: true },
  expirationDate: { type: Date },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
