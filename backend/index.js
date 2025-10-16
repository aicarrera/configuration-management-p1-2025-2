const express = require('express');
const app = express();
app.use(express.json());

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
let tasks = [
    { id: 1, title: 'Aprender Git', done: false },
    { id: 2, title: 'Hacer el workshop', done: false }
];

app.get('/getAll', (req, res) => {
    res.json(tasks);
});
app.post('/create', (req, res) => {
    const { tarea } = req.body;
    if (!tarea || tarea.trim() === '') {
      return res.status(400).json({ error: 'El campo tarea es obligatorio' });
    }
    const newTask = {
      id: tasks.length + 1,
      title: tarea.trim(),
      done: false
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
  });
  
  