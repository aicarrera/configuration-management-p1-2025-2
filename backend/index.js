const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;
app.use(cors());
app.use(express.json());

let tasks = [
  { id: 1, title: 'Sample Task 1', completed: false },
  { id: 2, title: 'Sample Task 2', completed: true }
];

let nextId = 3;

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// POST 
app.post('/tasks', (req, res) => {
  const { title } = req.body;
  
  if (!title) {
    return res.status(400).json({ error: 'Task title is required' });
  }
  
  const newTask = {
    id: nextId++,
    title: title,
    completed: false
  };
  
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// PUT 
app.put('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find(t => t.id === taskId);
  
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  
  task.completed = !task.completed;
  res.json(task);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
