const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let AUTO_ID = 1;
let tasks = [];

app.post('/tasks', (req, res) => {
  const { title } = req.body || {};
  if (!title || !String(title).trim()) {
    return res.status(400).json({ error: 'title requerido' });
  }
  const task = { id: AUTO_ID++, title: String(title).trim(), completed: false };
  tasks.push(task);
  return res.status(201).json(task);
});

app.listen(PORT, () => {
  console.log(`API (solo POST) en http://localhost:${PORT}`);
});
