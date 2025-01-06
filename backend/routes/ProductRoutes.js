const express = require('express');
const ProductController = require('../controllers/ProductController');
const router = express.Router();

router.post('/cadastro-produto', ProductController.create);
router.get('/cadastro-produto', ProductController.getAllProducts);  // Atualizado

module.exports = router;

