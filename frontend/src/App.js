import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CadastroProduto from './pages/CadastroProduto';
import CadastroFornecedor from './pages/CadastroFornecedor';
import AssociacaoFornecedorProduto from './pages/AssociacaoFornecedorProduto';
import Header from './components/Header';  // Importando o Header
import './styles/Global.css';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Adicionando o Header na parte superior */}
        <Header />  

        <Routes>
          <Route path="/" element={<h1>Bem-vindo ao Sistema de Controle de Estoque</h1>} />
          <Route path="/cadastro-produto" element={<CadastroProduto />} />
          <Route path="/cadastro-fornecedor" element={<CadastroFornecedor />} />
          <Route path="/associacao" element={<AssociacaoFornecedorProduto />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


