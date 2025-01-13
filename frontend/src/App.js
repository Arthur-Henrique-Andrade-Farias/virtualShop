// frontend/src/App.js
import React, { useState } from 'react';
import ProductList from './ProductList';
import ProductForm from './ProductForm';

function App() {
  const [showList, setShowList] = useState(true);

  function handleNewProductClick() {
    setShowList(false);
  }

  function handleProductCreated() {
    setShowList(true);
  }

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <span className="navbar-brand">VirtualShop</span>
        </div>
      </nav>

        <div className="container py-4 flex-grow-1" style={{ marginTop: '100px' }}>
          {showList ? (
            <ProductList onNewProductClick={handleNewProductClick} />
          ) : (
            <ProductForm onProductCreated={handleProductCreated} />
          )}
        </div>

      <footer className="bg-secondary text-white text-center py-3 mt-4">
        <p className="mb-0">&copy; 2025 VirtualShop - Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}

export default App;
