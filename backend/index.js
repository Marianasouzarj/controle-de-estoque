const express = require('express');
const connectDB = require('./config/db');
const productRoutes = require('./routes/ProductRoutes');

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());

// Conectar ao banco de dados
connectDB();

// Rotas
app.use('/api/products', productRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
