import React, { useState, useEffect } from 'react';

const AssociacaoFornecedorProduto = () => {
  const [products, setProducts] = useState([]); // Lista de produtos
  const [selectedProduct, setSelectedProduct] = useState(null); // Produto selecionado
  const [suppliers, setSuppliers] = useState([]); // Lista de fornecedores
  const [associatedSuppliers, setAssociatedSuppliers] = useState([]); // Fornecedores associados
  const [selectedSupplier, setSelectedSupplier] = useState(''); // Fornecedor selecionado
  const [message, setMessage] = useState(''); // Mensagens de feedback

  // Carregar lista de produtos e fornecedores ao montar o componente
  useEffect(() => {
    fetch('http://localhost:5001/api/products')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Erro ao carregar produtos:', error));


    fetch('http://localhost:5001/api/suppliers')
      .then((response) => response.json())
      .then((data) => setSuppliers(data))
      .catch((error) => console.error('Erro ao carregar fornecedores:', error));
  }, []);

  // Atualizar fornecedores associados ao produto selecionado
  useEffect(() => {
    if (selectedProduct) {
      fetch(`http://localhost:5001/api/products/${selectedProduct}/suppliers`)
        .then((response) => response.json())
        .then((data) => setAssociatedSuppliers(data))
        .catch((error) =>
          console.error('Erro ao carregar fornecedores associados:', error)
        );
    } else {
      setAssociatedSuppliers([]);
    }
  }, [selectedProduct]);

  const handleAssociate = () => {
    if (!selectedSupplier) {
      setMessage('Selecione um fornecedor para associar.');
      return;
    }

    fetch(`http://localhost:5001/api/products/${selectedProduct}/associate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ supplierId: selectedSupplier }),
    })
      .then((response) => {
        if (response.ok) {
          const supplier = suppliers.find((s) => s._id === selectedSupplier);
          setAssociatedSuppliers([...associatedSuppliers, supplier]);
          setMessage('Fornecedor associado com sucesso!');
          setSelectedSupplier('');
        } else {
          setMessage('Erro ao associar fornecedor.');
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
          setAssociatedSuppliers(
            associatedSuppliers.filter((s) => s._id !== id)
          );
          setMessage('Fornecedor desassociado com sucesso!');
        } else {
          setMessage('Erro ao desassociar fornecedor.');
        }
      })
      .catch((error) =>
        console.error('Erro ao desassociar fornecedor:', error)
      );
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

      {/* Exibição de informações do produto */}
      {selectedProduct && (
        <div className="product-info">
          <h3>Informações do Produto</h3>
          <div>
            <label>Nome:</label>
            <input
              type="text"
              value={
                products.find((product) => product._id === selectedProduct)
                  ?.name || ''
              }
              readOnly
            />
          </div>
          <div>
            <label>Código de Barras:</label>
            <input
              type="text"
              value={
                products.find((product) => product._id === selectedProduct)
                  ?.barcode || ''
              }
              readOnly
            />
          </div>
          <div>
            <label>Descrição:</label>
            <textarea
              value={
                products.find((product) => product._id === selectedProduct)
                  ?.description || ''
              }
              readOnly
            ></textarea>
          </div>
        </div>
      )}

      {/* Seleção de Fornecedor */}
      {selectedProduct && (
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
      )}

      {/* Lista de Fornecedores Associados */}
      {selectedProduct && associatedSuppliers.length > 0 && (
        <div className="associated-suppliers">
          <h3>Fornecedores Associados</h3>
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>CNPJ</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {associatedSuppliers.map((supplier) => (
                <tr key={supplier._id}>
                  <td>{supplier.companyName}</td>
                  <td>{supplier.cnpj}</td>
                  <td>
                    <button onClick={() => handleDissociate(supplier._id)}>
                      Desassociar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Mensagem de Feedback */}
      {message && <p style={{ color: 'blue' }}>{message}</p>}
    </div>
  );
};

export default AssociacaoFornecedorProduto;