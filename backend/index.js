const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

let tasks = [
  { id: 1, title: 'Task One', completed: false },
  { id: 2, title: 'Task Two', completed: true },
];


app.get('/tasks',(req,res)=> {res.json(tasks)});

app.post('/tasks', (req, res) => {
    const { title } = req.body;
    if (!title) {
        return res.status(400).json({ error: 'Title is required' });
    }
    const newTask = { id: tasks.length + 1, title, completed: false };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

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
