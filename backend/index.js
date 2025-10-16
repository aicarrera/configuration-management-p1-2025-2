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
