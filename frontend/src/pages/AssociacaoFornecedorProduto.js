import React, { useState, useEffect } from 'react';
import Header from '../components/Header';

const AssociacaoFornecedorProduto = () => {
  const [product, setProduct] = useState(null); // Dados do produto selecionado
  const [suppliers, setSuppliers] = useState([]); // Lista de fornecedores cadastrados
  const [associatedSuppliers, setAssociatedSuppliers] = useState([]); // Fornecedores associados
  const [selectedSupplier, setSelectedSupplier] = useState(''); // Fornecedor selecionado

  useEffect(() => {
    // Simulação de carregamento de dados do produto e fornecedores
    setProduct({
      nome: 'Notebook XYZ',
      codigoBarras: '1234567890123',
      descricao: 'Notebook de alto desempenho para uso profissional.',
      imagem: 'https://via.placeholder.com/150',
    });

    setSuppliers([
      { id: 1, nome: 'Fornecedor A', cnpj: '00.000.000/0001-00' },
      { id: 2, nome: 'Fornecedor B', cnpj: '11.111.111/0001-11' },
    ]);

    setAssociatedSuppliers([
      { id: 1, nome: 'Fornecedor A', cnpj: '00.000.000/0001-00' },
    ]);
  }, []);

  const handleAssociate = () => {
    if (selectedSupplier) {
      const supplier = suppliers.find((s) => s.id === parseInt(selectedSupplier));
      if (supplier && !associatedSuppliers.find((s) => s.id === supplier.id)) {
        setAssociatedSuppliers([...associatedSuppliers, supplier]);
      }
      setSelectedSupplier('');
    }
  };

  const handleDissociate = (id) => {
    setAssociatedSuppliers(associatedSuppliers.filter((s) => s.id !== id));
  };

  return (
    <div>
      <Header title="Associação de Fornecedor a Produto" onBack={() => console.log('Voltar')} />

      {product ? (
        <div>
          <div className="product-details">
            <h2>{product.nome}</h2>
            <img src={product.imagem} alt={product.nome} />
            <p><strong>Código de Barras:</strong> {product.codigoBarras}</p>
            <p><strong>Descrição:</strong> {product.descricao}</p>
          </div>

          <div className="associate-supplier">
            <h3>Associação de Fornecedor</h3>
            <select
              value={selectedSupplier}
              onChange={(e) => setSelectedSupplier(e.target.value)}
              placeholder="Selecione um fornecedor"
            >
              <option value="">Selecione um fornecedor</option>
              {suppliers.map((supplier) => (
                <option key={supplier.id} value={supplier.id}>
                  {supplier.nome}
                </option>
              ))}
            </select>
            <button onClick={handleAssociate}>Associar Fornecedor</button>
          </div>

          <div className="associated-suppliers">
            <h3>Fornecedores Associados</h3>
            <ul>
              {associatedSuppliers.map((supplier) => (
                <li key={supplier.id}>
                  <span>
                    <strong>Nome:</strong> {supplier.nome} | <strong>CNPJ:</strong> {supplier.cnpj}
                  </span>
                  <button onClick={() => handleDissociate(supplier.id)}>Desassociar</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <p>Carregando dados do produto...</p>
      )}
    </div>
  );
};

export default AssociacaoFornecedorProduto;
