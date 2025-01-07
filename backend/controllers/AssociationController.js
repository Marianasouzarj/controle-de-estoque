const Association = require('../models/Association');
const Product = require('../models/productModel');
const Supplier = require('../models/Supplier');

const AssociationController = {
  associate: async (req, res) => {
    try {
      const { productId, supplierId } = req.body;

      // Verifica se o produto existe
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ error: 'Produto não encontrado' });
      }

      // Verifica se o fornecedor existe
      const supplier = await Supplier.findById(supplierId);
      if (!supplier) {
        return res.status(404).json({ error: 'Fornecedor não encontrado' });
      }

      // Cria a associação
      const association = await Association.create({ product: productId, supplier: supplierId });
      res.status(201).json(association);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  getByProduct: async (req, res) => {
    try {
      const { productId } = req.params;
      const associations = await Association.find({ product: productId }).populate('supplier');
      res.status(200).json(associations);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  removeAssociation: async (req, res) => {
    try {
      const { id } = req.params;
      const association = await Association.findByIdAndDelete(id);
      if (!association) {
        return res.status(404).json({ error: 'Associação não encontrada' });
      }
      res.status(200).json({ message: 'Associação removida com sucesso' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = AssociationController;
