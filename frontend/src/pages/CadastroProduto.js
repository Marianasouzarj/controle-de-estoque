import React, { useState } from 'react';

const CadastroProduto = () => {
  const [form, setForm] = useState({
    nome: '',
    codigoBarras: '',
    descricao: '',
    quantidade: '',
    categoria: '',
    validade: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Produto cadastrado:', form);
  };

  return (
    <div>
      {/* O Header foi removido daqui, pois já está no App.js */}
      <form onSubmit={handleSubmit}>
        <label>Nome do Produto</label>
        <input
          type="text"
          name="nome"
          value={form.nome}
          onChange={handleChange}
          placeholder="Insira o nome do produto"
          required
        />
        <label>Código de Barras</label>
        <input
          type="text"
          name="codigoBarras"
          value={form.codigoBarras}
          onChange={handleChange}
          placeholder="Insira o código de barras"
        />
        <label>Descrição</label>
        <textarea
          name="descricao"
          value={form.descricao}
          onChange={handleChange}
          placeholder="Descreva brevemente o produto"
          required
        ></textarea>
        <label>Quantidade</label>
        <input
          type="number"
          name="quantidade"
          value={form.quantidade}
          onChange={handleChange}
          placeholder="Quantidade disponível"
        />
        <label>Categoria</label>
        <select name="categoria" value={form.categoria} onChange={handleChange} required>
          <option value="">Selecione uma categoria</option>
          <option value="Eletrônicos">Eletrônicos</option>
          <option value="Alimentos">Alimentos</option>
          <option value="Vestuário">Vestuário</option>
          <option value="Outro">Outro</option>
        </select>
        <label>Data de Validade</label>
        <input
          type="date"
          name="validade"
          value={form.validade}
          onChange={handleChange}
        />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default CadastroProduto;

