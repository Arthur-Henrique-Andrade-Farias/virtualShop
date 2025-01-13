import React, { useEffect, useState } from 'react';

function ProductList({ onNewProductClick }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      const response = await fetch('http://localhost:3001/products');
      if (!response.ok) {
        throw new Error(`Erro: ${response.status} - ${response.statusText}`);
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }
  }

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="mb-0">Listagem de Produtos</h2>
      </div>
      <div className="card-body">
        <button
          className="btn btn-primary mb-3"
          onClick={onNewProductClick}
        >
          Cadastrar novo produto
        </button>

        <div className="table-responsive">
          <table className="table table-hover table-bordered align-middle">
            <thead className="table-light">
              <tr>
                <th>Nome</th>
                <th>Valor (R$)</th>
              </tr>
            </thead>
            <tbody>
              {products.map((prod) => (
                <tr key={prod.id}>
                  <td>{prod.name}</td>
                  <td>{prod.value}</td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan="2" className="text-center">
                    Nenhum produto cadastrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ProductList;
