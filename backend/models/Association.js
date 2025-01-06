const mongoose = require('mongoose');

const associationSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  supplier: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier', required: true },
});

module.exports = mongoose.model('Association', associationSchema);
