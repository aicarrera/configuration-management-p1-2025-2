const express = require('express');
const app = express();
app.use(express.json());

let tasks = [];
let nextId = 1;

app.get('/tasks', (req, res) => res.json(tasks));

app.post('/tasks', (req, res) => {
  const newTask = { id: nextId++, title: req.body.title, completed: false };
  tasks.push(newTask);
  res.json(newTask);
});

app.put('/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id == req.params.id);
  if (task) task.completed = true;
  res.json(task || {});
});

app.listen(3000, () => console.log('Servidor en http://localhost:3000'));