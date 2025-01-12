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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5001/api/products/cadastro-produto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.nome,
          barcode: form.codigoBarras,
          description: form.descricao,
          stockQuantity: form.quantidade,
          category: form.categoria,
          expirationDate: form.validade,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Produto cadastrado com sucesso:', data);
        alert('Produto cadastrado com sucesso!');
        // Limpa o formulário após o cadastro
        setForm({
          nome: '',
          codigoBarras: '',
          descricao: '',
          quantidade: '',
          categoria: '',
          validade: '',
        });
      } else {
        const errorData = await response.json();
        console.error('Erro ao cadastrar o produto:', errorData);
        alert('Erro ao cadastrar o produto: ' + errorData.message);
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      alert('Erro ao se comunicar com o servidor.');
    }
  };

  return (
    <div>
      <h2>Cadastro de Produto</h2>
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
