// frontend/src/ProductList.js
import React, { useEffect, useState } from 'react';

function ProductList({ user, onNewProductClick, onEditProduct }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadProducts() {
    try {
      // Caso o back-end retorne todos os produtos
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
        <button className="btn btn-primary mb-3" onClick={onNewProductClick}>
          Cadastrar novo produto
        </button>

        <div className="table-responsive">
          <table className="table table-hover table-bordered align-middle">
            <thead className="table-light">
              <tr>
                <th>Nome</th>
                <th>Valor (R$)</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {products.map((prod) => (
                <tr key={prod.id}>
                  <td>{prod.name}</td>
                  <td>{prod.value}</td>
                  <td>
                    {user.id === prod.user_id && (
                      <button
                        className="btn btn-sm btn-warning"
                        onClick={() => onEditProduct(prod)}
                      >
                        Editar
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan="3" className="text-center">
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
