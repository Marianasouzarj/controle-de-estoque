const Supplier = require('../models/Supplier');

const SupplierController = {
  create: async (req, res) => {
    try {
      const supplier = await Supplier.create(req.body);
      res.status(201).json(supplier);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  getAll: async (req, res) => {
    try {
      const suppliers = await Supplier.find();
      res.status(200).json(suppliers);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  getById: async (req, res) => {
    try {
      const supplier = await Supplier.findById(req.params.id);
      if (!supplier) {
        return res.status(404).json({ error: 'Fornecedor não encontrado' });
      }
      res.status(200).json(supplier);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  update: async (req, res) => {
    try {
      const supplier = await Supplier.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!supplier) {
        return res.status(404).json({ error: 'Fornecedor não encontrado' });
      }
      res.status(200).json(supplier);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  delete: async (req, res) => {
    try {
      const supplier = await Supplier.findByIdAndDelete(req.params.id);
      if (!supplier) {
        return res.status(404).json({ error: 'Fornecedor não encontrado' });
      }
      res.status(200).json({ message: 'Fornecedor excluído com sucesso' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = SupplierController;
