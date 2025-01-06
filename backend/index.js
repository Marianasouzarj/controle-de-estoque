const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

// Importando as rotas
const productRoutes = require('./routes/productRoutes');
const supplierRoutes = require('./routes/supplierRoutes');
const associationRoutes = require('./routes/associationRoutes');

// Configuração do dotenv
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Conexão com o MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Conectado ao MongoDB'))
  .catch((error) => console.error('Erro ao conectar ao MongoDB:', error));

// Rotas
app.use('/api/products', productRoutes); // Rotas de produtos
app.use('/api/suppliers', supplierRoutes); // Rotas de fornecedores
app.use('/api/associations', associationRoutes); // Rotas de associações

// Rota inicial
app.get('/', (req, res) => {
  res.send('API funcionando!');
});

// Iniciando o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

