// backend/server.js
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

let products = [];

app.get('/products', (req, res) => {
  const sortedProducts = [...products].sort((a, b) => a.value - b.value);
  return res.json(sortedProducts);
});

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

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Backend rodando na porta ${PORT}`);
});
