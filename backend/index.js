const express = require('express');
const app = express();
app.use(express.json());

let tasks = [];
let nextId = 1;

//GET /tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

//POST /tasks
app.post('/tasks', (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: 'Título requerido' });

  const newTask = { id: nextId++, title, completed: false };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

//PUT /tasks/:id 
app.put('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find(t => t.id === taskId);

  if (!task) return res.status(404).json({ error: 'Tarea no encontrada' });

  task.completed = true;
  res.json(task);
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
