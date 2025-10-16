const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

let nextId = 3;
let tasks = [
  { id: 1, title: 'Tarea inicial', completed: false },
  { id: 2, title: 'Otra tarea', completed: true },
];

app.get('/tasks', (req, res) => {
  res.json(tasks);
});


app.post('/tasks', (req, res) => {
    const { title } = req.body || {};
    if (!title) return res.status(400).json({ error: 'title requerido' });
    const task = { id: nextId++, title, completed: false };
    tasks.push(task);
    res.status(201).json(task);
  });
  
  app.put('/tasks/:id', (req, res) => {
    const id = Number(req.params.id);
    const found = tasks.find(t => t.id === id);
    if (!found) return res.status(404).json({ error: 'no existe' });
    found.completed = true;
    res.json(found);
  });
  
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`API escuchando en http://localhost:${PORT}`));
