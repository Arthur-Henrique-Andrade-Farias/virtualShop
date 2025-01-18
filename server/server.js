// backend/server.js
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

let products = [];
let users = []; // Lista de usuários armazenados em memória

// Endpoint para obter produtos
app.get('/products', (req, res) => {
  const sortedProducts = [...products].sort((a, b) => a.value - b.value);
  return res.json(sortedProducts);
});

// Endpoint para criar um produto
app.post('/products', (req, res) => {
  const { name, description, value, available } = req.body;

  if (!name || value == null) {
    return res
      .status(400)
      .json({ error: 'Nome e valor são obrigatórios.' });
  }

  const newProduct = {
    id: products.length + 1,
    name,
    description,
    value: Number(value),
    available: available === 'sim',
  };

  products.push(newProduct);

  return res.status(201).json(newProduct);
});

// Endpoint para registrar um novo usuário
app.post('/register', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Usuário e senha são obrigatórios.' });
  }

  const userExists = users.find(user => user.username === username);
  if (userExists) {
    return res.status(400).json({ error: 'Usuário já existe.' });
  }

  const newUser = {
    id: users.length + 1,
    username,
    password, // Em um ambiente real, use bcrypt para hash de senha
  };

  users.push(newUser);

  return res.status(201).json({ message: 'Usuário registrado com sucesso!' });
});

// Endpoint para login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Usuário e senha são obrigatórios.' });
  }

  const user = users.find(
    user => user.username === username && user.password === password
  );

  if (!user) {
    return res.status(401).json({ error: 'Credenciais inválidas.' });
  }

  return res.status(200).json({ message: 'Login bem-sucedido!', user: { id: user.id, username: user.username } });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Backend rodando na porta ${PORT}`);
});
