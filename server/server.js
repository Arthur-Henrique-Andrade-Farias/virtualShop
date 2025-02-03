// backend/server.js
import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';

const app = express();
app.use(cors());
app.use(express.json());

// Configuração de conexão com o MySQL utilizando o usuário root e a senha 'MeuSenha@2022'
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'MeuSenha@2022',
  database: 'virtualshop'
});

/*
  ===============================
  ENDPOINTS PARA PRODUTOS
  ===============================
*/

// GET /products
app.get('/products', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM products ORDER BY value ASC'
    );
    res.json(rows);
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    res.status(500).json({ error: 'Erro ao buscar produtos.' });
  }
});

// POST /products
app.post('/products', async (req, res) => {
  const { user_id, name, description, value, available } = req.body;

  if (!user_id || !name || value == null) {
    return res.status(400).json({ error: 'user_id, nome e valor são obrigatórios.' });
  }
  try {
    const [result] = await pool.query(
      'INSERT INTO products (user_id, name, description, value, available) VALUES (?, ?, ?, ?, ?)',
      [user_id, name, description, Number(value), available === 'sim']
    );
    const newProductId = result.insertId;
    const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [newProductId]);
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error('Erro ao cadastrar produto:', error);
    res.status(500).json({ error: 'Erro ao cadastrar produto.' });
  }
});

// PUT /products/:id (Editar produto)
// Apenas o usuário que criou o produto pode editá-lo
app.put('/products/:id', async (req, res) => {
  const productId = req.params.id;
  const { user_id, name, description, value, available } = req.body;

  if (!user_id || !name || value == null) {
    return res.status(400).json({ error: 'user_id, nome e valor são obrigatórios.' });
  }

  try {
    // Verifica se o produto existe
    const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [productId]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Produto não encontrado.' });
    }

    const product = rows[0];
    // Checa se o usuário que está tentando editar é o dono do produto
    if (product.user_id !== Number(user_id)) {
      return res.status(403).json({ error: 'Você não tem permissão para editar este produto.' });
    }

    // Atualiza o produto
    await pool.query(
      'UPDATE products SET name = ?, description = ?, value = ?, available = ? WHERE id = ?',
      [name, description, Number(value), available === 'sim', productId]
    );

    // Retorna o produto atualizado
    const [updatedRows] = await pool.query('SELECT * FROM products WHERE id = ?', [productId]);
    res.json(updatedRows[0]);
  } catch (error) {
    console.error('Erro ao atualizar produto:', error);
    res.status(500).json({ error: 'Erro ao atualizar produto.' });
  }
});

/*
  ===============================
  ENDPOINTS PARA USUÁRIOS
  ===============================
*/

// POST /register
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Usuário e senha são obrigatórios.' });
  }
  try {
    // Verifica se o usuário já existe
    const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
    if (rows.length > 0) {
      return res.status(400).json({ error: 'Usuário já existe.' });
    }
    const [result] = await pool.query(
      'INSERT INTO users (username, password) VALUES (?, ?)',
      [username, password]
    );
    res.status(201).json({ message: 'Usuário registrado com sucesso!', userId: result.insertId });
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    res.status(500).json({ error: 'Erro ao registrar usuário.' });
  }
});

// POST /login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Usuário e senha são obrigatórios.' });
  }
  try {
    const [rows] = await pool.query(
      'SELECT * FROM users WHERE username = ? AND password = ?',
      [username, password]
    );
    if (rows.length === 0) {
      return res.status(401).json({ error: 'Credenciais inválidas.' });
    }
    const user = rows[0];
    res.status(200).json({ message: 'Login bem-sucedido!', user: { id: user.id, username: user.username } });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).json({ error: 'Erro ao fazer login.' });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Backend rodando na porta ${PORT}`);
});
