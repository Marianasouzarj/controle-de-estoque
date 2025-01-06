const Product = require('../models/productModel'); // Modelo de Produto

// Função para criar um novo produto
const createProduct = async (req, res) => {
  try {
    const { name, barcode, description, stockQuantity, category, expirationDate } = req.body;

    // Verifica se todos os campos necessários estão presentes
    if (!name || !barcode || !description || !stockQuantity || !category || !expirationDate) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    // Cria um novo produto
    const newProduct = new Product({
      name,             // nome do produto
      barcode,          // código de barras
      description,      // descrição
      stockQuantity,    // quantidade em estoque
      category,         // categoria
      expirationDate,   // data de validade
    });

    // Salva o produto no banco de dados
    await newProduct.save();

    res.status(201).json({ message: 'Produto cadastrado com sucesso!', product: newProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao cadastrar o produto.' });
  }
};

// Função para obter todos os produtos
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find(); // Busca todos os produtos no banco de dados
    res.status(200).json(products); // Retorna os produtos encontrados
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar os produtos.' });
  }
};

// Exporta as funções
module.exports = {
  createProduct,
  getAllProducts, // Adiciona a função getAllProducts à exportação
};


