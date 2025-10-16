const express = require('express');
const app = express();
const port = 3000;

let tasks = [
  { id: 1, title: "Tarea de ejemplo", completed: false }
];

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.listen(port, () => {
  console.log(`Servidor backend escuchando en http://localhost:${port}`);
});
