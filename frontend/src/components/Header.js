// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <h1 className="header-title">Controle de Estoque</h1>
      <nav>
        <Link to="/">Home</Link> | 
        <Link to="/cadastro-produto">Cadastro Produto</Link> | 
        <Link to="/cadastro-fornecedor">Cadastro Fornecedor</Link> | 
        <Link to="/associacao">Associação</Link>
      </nav>
    </header>
  );
}

export default Header;

