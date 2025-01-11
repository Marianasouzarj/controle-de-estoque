import React, { useState, useEffect } from 'react';

const AssociacaoFornecedorProduto = () => {
  const [products, setProducts] = useState([]); // Lista de produtos
  const [selectedProduct, setSelectedProduct] = useState(null); // Produto selecionado
  const [suppliers, setSuppliers] = useState([]); // Lista de fornecedores
  const [associatedSuppliers, setAssociatedSuppliers] = useState([]); // Fornecedores associados ao produto selecionado
  const [selectedSupplier, setSelectedSupplier] = useState(''); // Fornecedor selecionado
  const [message, setMessage] = useState(''); // Mensagens de feedback

  // Buscar produtos e fornecedores ao carregar a página
  useEffect(() => {
    // Buscar produtos do backend
    fetch('http://localhost:5001/api/products')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Erro ao carregar produtos:', error));

    // Buscar fornecedores do backend
    fetch('http://localhost:5001/api/suppliers')
      .then((response) => response.json())
      .then((data) => setSuppliers(data))
      .catch((error) => console.error('Erro ao carregar fornecedores:', error));
  }, []);

  // Atualizar fornecedores associados ao selecionar um produto
  useEffect(() => {
    if (selectedProduct) {
      // Buscar fornecedores associados ao produto selecionado
      fetch(`http://localhost:5001/api/products/${selectedProduct}/suppliers`)
        .then((response) => response.json())
        .then((data) => setAssociatedSuppliers(data))
        .catch((error) => console.error('Erro ao carregar fornecedores associados:', error));
    } else {
      setAssociatedSuppliers([]);
    }
  }, [selectedProduct]);

  const handleAssociate = () => {
    if (!selectedProduct || !selectedSupplier) {
      setMessage('Por favor, selecione um produto e um fornecedor antes de associar.');
      return;
    }

    const supplier = suppliers.find((s) => s._id === selectedSupplier);

    if (!supplier) {
      setMessage('Fornecedor não encontrado.');
      return;
    }

    if (associatedSuppliers.find((s) => s._id === supplier._id)) {
      setMessage('Fornecedor já está associado a este produto!');
      return;
    }

    // Associar fornecedor ao produto no backend
    fetch(`http://localhost:5001/api/products/${selectedProduct}/associate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ supplierId: selectedSupplier }),
    })
      .then((response) => {
        if (response.ok) {
          setAssociatedSuppliers([...associatedSuppliers, supplier]);
          setMessage('Fornecedor associado com sucesso ao produto!');
          setSelectedSupplier('');
        } else {
          setMessage('Erro ao associar fornecedor ao produto.');
        }
      })
      .catch((error) => console.error('Erro ao associar fornecedor:', error));
  };

  const handleDissociate = (id) => {
    fetch(`http://localhost:5001/api/products/${selectedProduct}/dissociate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ supplierId: id }),
    })
      .then((response) => {
        if (response.ok) {
          setAssociatedSuppliers(associatedSuppliers.filter((s) => s._id !== id));
          setMessage('Fornecedor desassociado com sucesso!');
        } else {
          setMessage('Erro ao desassociar fornecedor do produto.');
        }
      })
      .catch((error) => console.error('Erro ao desassociar fornecedor:', error));
  };

  return (
    <div>
      <h2>Associação de Fornecedor a Produto</h2>

      {/* Seleção de Produto */}
      <div className="product-selection">
        <h3>Selecione um Produto</h3>
        <select
          value={selectedProduct || ''}
          onChange={(e) => setSelectedProduct(e.target.value)}
        >
          <option value="">Selecione um produto</option>
          {products.map((product) => (
            <option key={product._id} value={product._id}>
              {product.name}
            </option>
          ))}
        </select>
      </div>

      {/* Mostrar fornecedores e associações somente se um produto for selecionado */}
      {selectedProduct && (
        <>
          {/* Seleção de Fornecedor */}
          <div className="associate-supplier">
            <h3>Associação de Fornecedor</h3>
            <select
              value={selectedSupplier}
              onChange={(e) => setSelectedSupplier(e.target.value)}
            >
              <option value="">Selecione um fornecedor</option>
              {suppliers.map((supplier) => (
                <option key={supplier._id} value={supplier._id}>
                  {supplier.companyName}
                </option>
              ))}
            </select>
            <button onClick={handleAssociate}>Associar Fornecedor</button>
          </div>

          {/* Lista de Fornecedores Associados */}
          <div className="associated-suppliers">
            <h3>Fornecedores Associados</h3>
            <ul>
              {associatedSuppliers.map((supplier) => (
                <li key={supplier._id}>
                  <span>
                    <strong>Nome:</strong> {supplier.companyName} | <strong>CNPJ:</strong> {supplier.cnpj}
                  </span>
                  <button onClick={() => handleDissociate(supplier._id)}>Desassociar</button>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}

      {/* Exibir mensagens de feedback */}
      {message && <p style={{ color: 'blue' }}>{message}</p>}
    </div>
  );
};

export default AssociacaoFornecedorProduto;

