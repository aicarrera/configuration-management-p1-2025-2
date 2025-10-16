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
