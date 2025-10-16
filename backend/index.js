// index.js
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory "database"
let tasks = [];
let nextId = 1;

// Small helper
const findTask = (id) => tasks.find((t) => t.id === id);

// Health/info
app.get("/", (_req, res) => {
  res.json({
    name: "Tasks API",
    endpoints: {
      "GET /tasks": "Retrieve all tasks",
      "POST /tasks": "Add a new task (body: { title: string })",
      "PUT /tasks/:id": "Mark a task as completed",
    },
  });
});

// GET /tasks — Retrieve all tasks
app.get("/tasks", (_req, res) => {
  res.json(tasks);
});

// POST /tasks — Add a new task
app.post("/tasks", (req, res) => {
  const { title } = req.body || {};
  if (typeof title !== "string" || title.trim().length === 0) {
    return res.status(400).json({ error: "Field 'title' is required and must be a non-empty string." });
  }

  const task = {
    id: nextId++,
    title: title.trim(),
    completed: false,
    createdAt: new Date().toISOString(),
  };

  tasks.push(task);
  res.status(201).json(task);
});

// PUT /tasks/:id — Mark a task as completed
app.put("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ error: "Invalid 'id' parameter." });
  }

  const task = findTask(id);
  if (!task) {
    return res.status(404).json({ error: "Task not found." });
  }

  if (task.completed) {
    return res.status(200).json(task); // already completed; idempotent
  }

  task.completed = true;
  task.completedAt = new Date().toISOString();
  res.json(task);
});

// 404 for unknown routes
app.use((_req, res) => res.status(404).json({ error: "Not found" }));

// Start server
app.listen(PORT, () => {
  console.log(`Tasks API listening on http://localhost:${PORT}`);
});
