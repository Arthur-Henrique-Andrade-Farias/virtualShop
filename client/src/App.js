// frontend/src/App.js
import React, { useState } from 'react';
import ProductList from './ProductList';
import ProductForm from './ProductForm';
import ProductEdit from './ProductEdit';
import Login from './Login';
import Register from './Register';

function App() {
  const [showList, setShowList] = useState(true);
  const [showLogin, setShowLogin] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);

  function handleNewProductClick() {
    setShowList(false);
  }

  function handleProductCreated() {
    setShowList(true);
  }

  function handleLogin(userData) {
    setIsAuthenticated(true);
    setUser(userData);
  }

  function handleLogout() {
    setIsAuthenticated(false);
    setUser(null);
  }

  function toggleAuthForm() {
    setShowLogin(!showLogin);
  }

  // Ao clicar no botão de editar, define o produto a ser editado
  function handleEditProduct(product) {
    setEditingProduct(product);
  }

  // Após atualizar, volta para a lista (ou atualize a lista conforme necessário)
  function handleProductUpdated(updatedProduct) {
    setEditingProduct(null);
    setShowList(true);
  }

  function handleCancelEdit() {
    setEditingProduct(null);
  }

  if (!isAuthenticated) {
    return (
      <div className="d-flex flex-column min-vh-100 bg-light">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container">
            <span className="navbar-brand">VirtualShop</span>
          </div>
        </nav>

        <div className="container py-4 flex-grow-1" style={{ marginTop: '100px' }}>
          {showLogin ? (
            <Login onLogin={handleLogin} toggleForm={toggleAuthForm} />
          ) : (
            <Register toggleForm={toggleAuthForm} />
          )}
        </div>

        <footer className="bg-secondary text-white text-center py-3 mt-4">
          <p className="mb-0">&copy; 2025 VirtualShop - Todos os direitos reservados.</p>
        </footer>
      </div>
    );
  }

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <span className="navbar-brand">VirtualShop</span>
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      <div className="container py-4 flex-grow-1" style={{ marginTop: '100px' }}>
        {editingProduct ? (
          <ProductEdit
            user={user}
            product={editingProduct}
            onProductUpdated={handleProductUpdated}
            onCancel={handleCancelEdit}
          />
        ) : showList ? (
          <ProductList
            user={user}
            onNewProductClick={handleNewProductClick}
            onEditProduct={handleEditProduct}
          />
        ) : (
          <ProductForm user={user} onProductCreated={handleProductCreated} />
        )}
      </div>

      <footer className="bg-secondary text-white text-center py-3 mt-4">
        <p className="mb-0">&copy; 2025 VirtualShop - Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}

export default App;
