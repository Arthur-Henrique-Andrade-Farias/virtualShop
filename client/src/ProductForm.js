// frontend/src/ProductForm.js
import React, { useState } from 'react';

function ProductForm({ user, onProductCreated }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const [available, setAvailable] = useState('sim');

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: user.id, // associa o produto ao usuário logado
          name,
          description,
          value,
          available,
        }),
      });
      if (!response.ok) {
        throw new Error(`Erro: ${response.status} - ${response.statusText}`);
      }
      await response.json();
      onProductCreated();
    } catch (error) {
      console.error('Erro ao cadastrar produto:', error);
    }
  }

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="mb-0">Cadastro de Produto</h2>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          {/* campos do formulário */}
          <div className="mb-3">
            <label className="form-label">Nome do produto</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Teclado Mecânico"
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
              placeholder="Descreva o produto..."
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

          <button type="submit" className="btn btn-success">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProductForm;
