import React, { useState } from 'react';

const CadastroFornecedor = () => {
  const [form, setForm] = useState({
    nomeEmpresa: '',
    cnpj: '',
    endereco: '',
    telefone: '',
    email: '',
    contatoPrincipal: '',
  });

  const [mensagem, setMensagem] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5001/api/suppliers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        setMensagem('Fornecedor cadastrado com sucesso!');
        setForm({
          nomeEmpresa: '',
          cnpj: '',
          endereco: '',
          telefone: '',
          email: '',
          contatoPrincipal: '',
        });
      } else {
        setMensagem('Erro ao cadastrar fornecedor. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao enviar dados para o backend:', error);
      setMensagem('Erro ao conectar ao servidor.');
    }
  };

  return (
    <div>
      <h2>Cadastro de Fornecedor</h2>
      {mensagem && <p>{mensagem}</p>}
      <form onSubmit={handleSubmit}>
        <label>Nome da Empresa</label>
        <input
          type="text"
          name="nomeEmpresa"
          value={form.nomeEmpresa}
          onChange={handleChange}
          placeholder="Insira o nome da empresa"
          required
        />
        <label>CNPJ</label>
        <input
          type="text"
          name="cnpj"
          value={form.cnpj}
          onChange={handleChange}
          placeholder="00.000.000/0000-00"
          required
        />
        <label>Endereço</label>
        <textarea
          name="endereco"
          value={form.endereco}
          onChange={handleChange}
          placeholder="Insira o endereço completo da empresa"
          required
        ></textarea>
        <label>Telefone</label>
        <input
          type="tel"
          name="telefone"
          value={form.telefone}
          onChange={handleChange}
          placeholder="(00) 0000-0000"
          required
        />
        <label>E-mail</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="exemplo@fornecedor.com"
          required
        />
        <label>Contato Principal</label>
        <input
          type="text"
          name="contatoPrincipal"
          value={form.contatoPrincipal}
          onChange={handleChange}
          placeholder="Nome do contato principal"
          required
        />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default CadastroFornecedor;


