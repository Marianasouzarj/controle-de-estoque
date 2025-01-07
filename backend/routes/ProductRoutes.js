const express = require('express');
const ProductController = require('../controllers/ProductController');
const router = express.Router();

router.post('/cadastro-produto', ProductController.createProduct);
router.get('/cadastro-produto', ProductController.getAllProducts);  // Atualizado

module.exports = router;

