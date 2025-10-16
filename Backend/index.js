const express = require('express');
const app = express();
const port = 3000;

let tasks = [
  { id: 1, title: "Tarea de ejemplo 1", completed: false },
  { id: 2, title: "Tarea de ejemplo 2", completed: true }
];

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.listen(port, () => {
  console.log(`Servidor backend escuchando en http://localhost:${port}`);
});
