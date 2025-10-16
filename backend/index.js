// 1. Import the express library
const express = require('express');

// 2. Create an instance of an Express application
const app = express();
const port = 3000; // The port the server will listen on

// Middleware to parse JSON bodies
app.use(express.json());

// In-memory storage for tasks
let tasks = [];
let taskIdCounter = 1;

// 3. Define a route handler for GET requests to the root URL ("/")
// When a user visits your site's homepage, this function will run.
app.get('/', (req, res) => {
  // req is the request object, res is the response object
  res.send('Hello, World! This is an Express server. 🚀');
});

// 4. Define another endpoint for serving JSON data
app.get('/api/user', (req, res) => {
  const user = {
    firstName: 'John',
    lastName: 'Doe',
    id: 123
  };
  // The .json() method automatically sets the Content-Type header to application/json
  res.json(user);
});

// PUT /tasks/:id - Mark a task as completed
app.put('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find(t => t.id === taskId);

  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }

  task.completed = true;
  res.json(task);
});

// 5. Start the server and make it listen for incoming requests
app.listen(port, () => {
  console.log(`✅ Server is running at http://localhost:${port}`);
});