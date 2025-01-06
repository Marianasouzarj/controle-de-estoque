const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  cnpj: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  mainContact: { type: String, required: true },
});

module.exports = mongoose.model('Supplier', supplierSchema);
