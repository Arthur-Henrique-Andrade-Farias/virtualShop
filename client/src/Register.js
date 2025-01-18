// frontend/src/Register.js
import React, { useState } from 'react';

function Register({ toggleForm }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Registro bem-sucedido! Redirecionando para login...');
        setError('');
        setTimeout(() => {
          toggleForm(); // Redireciona para o login após mostrar a mensagem
        }, 2000);
      } else {
        setError(data.error);
        setSuccess('');
      }
    } catch (err) {
      setError('Erro ao conectar ao servidor.');
      setSuccess('');
    }
  };

  return (
    <div className="card mx-auto" style={{ maxWidth: '400px' }}>
      <div className="card-body">
        <h5 className="card-title">Registrar-se</h5>
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Usuário</label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Senha</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Registrar</button>
        </form>
        <button className="btn btn-link w-100 mt-3" onClick={toggleForm}>Já tem uma conta? Faça login</button>
      </div>
    </div>
  );
}

export default Register;
