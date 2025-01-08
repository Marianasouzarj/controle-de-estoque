import React, { useState } from 'react';

const CadastroFornecedor = () => {
  const [form, setForm] = useState({
    companyName: '', // Alinhado ao modelo do Mongoose
    cnpj: '',
    fullAddress: '', // Alinhado ao modelo do Mongoose
    contactPhone: '', // Alinhado ao modelo do Mongoose
    email: '',
    mainContact: '', // Alinhado ao modelo do Mongoose
  });

  const [mensagem, setMensagem] = useState('');
  const [erros, setErros] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validarFormulario = () => {
    const novosErros = {};

    if (!form.companyName.trim()) {
      novosErros.companyName = 'O nome da empresa é obrigatório.';
    }

    if (!form.cnpj.trim() || !/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/.test(form.cnpj)) {
      novosErros.cnpj = 'CNPJ inválido. Use o formato 00.000.000/0000-00.';
    }

    if (!form.fullAddress.trim()) {
      novosErros.fullAddress = 'O endereço completo é obrigatório.';
    }

    if (!form.contactPhone.trim() || !/^\(\d{2}\)\s\d{4,5}-\d{4}$/.test(form.contactPhone)) {
      novosErros.contactPhone = 'Telefone inválido. Use o formato (00) 0000-0000 ou (00) 90000-0000.';
    }

    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) {
      novosErros.email = 'E-mail inválido.';
    }

    if (!form.mainContact.trim()) {
      novosErros.mainContact = 'O contato principal é obrigatório.';
    }

    setErros(novosErros);
    return Object.keys(novosErros).length === 0; // Retorna true se não houver erros
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validarFormulario()) {
      setMensagem('Por favor, corrija os erros no formulário.');
      return;
    }

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
          companyName: '',
          cnpj: '',
          fullAddress: '',
          contactPhone: '',
          email: '',
          mainContact: '',
        });
        setErros({});
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
          name="companyName"
          value={form.companyName}
          onChange={handleChange}
          placeholder="Insira o nome da empresa"
          required
        />
        {erros.companyName && <p style={{ color: 'red' }}>{erros.companyName}</p>}

        <label>CNPJ</label>
        <input
          type="text"
          name="cnpj"
          value={form.cnpj}
          onChange={handleChange}
          placeholder="00.000.000/0000-00"
          required
        />
        {erros.cnpj && <p style={{ color: 'red' }}>{erros.cnpj}</p>}

        <label>Endereço Completo</label>
        <textarea
          name="fullAddress"
          value={form.fullAddress}
          onChange={handleChange}
          placeholder="Insira o endereço completo da empresa"
          required
        ></textarea>
        {erros.fullAddress && <p style={{ color: 'red' }}>{erros.fullAddress}</p>}

        <label>Telefone</label>
        <input
          type="tel"
          name="contactPhone"
          value={form.contactPhone}
          onChange={handleChange}
          placeholder="(00) 0000-0000"
          required
        />
        {erros.contactPhone && <p style={{ color: 'red' }}>{erros.contactPhone}</p>}

        <label>E-mail</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="exemplo@fornecedor.com"
          required
        />
        {erros.email && <p style={{ color: 'red' }}>{erros.email}</p>}

        <label>Contato Principal</label>
        <input
          type="text"
          name="mainContact"
          value={form.mainContact}
          onChange={handleChange}
          placeholder="Nome do contato principal"
          required
        />
        {erros.mainContact && <p style={{ color: 'red' }}>{erros.mainContact}</p>}

        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default CadastroFornecedor;


