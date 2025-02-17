// frontend/src/ProductEdit.js
import React, { useState } from 'react';

function ProductEdit({ user, product, onProductUpdated, onCancel }) {
  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description || '');
  const [value, setValue] = useState(product.value);
  const [available, setAvailable] = useState(product.available ? 'sim' : 'não');

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3001/products/${product.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: user.id, // informa o usuário que está realizando a alteração
          name,
          description,
          value,
          available,
        }),
      });
      if (!response.ok) {
        throw new Error(`Erro: ${response.status} - ${response.statusText}`);
      }
      const updatedProduct = await response.json();
      onProductUpdated(updatedProduct);
    } catch (error) {
      console.error('Erro ao atualizar produto:', error);
    }
  }

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="mb-0">Editar Produto</h2>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nome do produto</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Descrição do produto</label>
            <textarea
              className="form-control"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Valor do produto (R$)</label>
            <input
              type="number"
              step="0.01"
              className="form-control"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Disponível para venda</label>
            <select
              className="form-select"
              value={available}
              onChange={(e) => setAvailable(e.target.value)}
            >
              <option value="sim">Sim</option>
              <option value="não">Não</option>
            </select>
          </div>
          <button type="submit" className="btn btn-success">Atualizar</button>
          <button type="button" className="btn btn-secondary ms-2" onClick={onCancel}>Cancelar</button>
        </form>
      </div>
    </div>
  );
}

export default ProductEdit;
