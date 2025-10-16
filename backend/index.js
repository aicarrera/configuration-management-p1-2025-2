// Developer A: GET /tasks (simulado)
const express = require("express");
const app = express();

const tasks = [
  { id: 1, title: "Tarea de ejemplo", completed: false },
  { id: 2, title: "Otra tarea", completed: true }
];

app.get("/tasks", (req, res) => {
  res.json(tasks);
});

app.listen(3000, () => console.log("API en http://localhost:3000"));