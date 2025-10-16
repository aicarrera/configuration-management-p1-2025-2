const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let AUTO_ID = 1;
let tasks = [
  { id: 1, title: "Comprar comida", completed: false },
  { id: 2, title: "Hacer ejercicio", completed: false },
  { id: 3, title: "Estudiar Node.js", completed: true },
];
app.post("/tasks", (req, res) => {
  const { title } = req.body || {};
  if (!title || !String(title).trim()) {
    return res.status(400).json({ error: "title requerido" });
  }
  const task = { id: AUTO_ID++, title: String(title).trim(), completed: false };
  tasks.push(task);
  return res.status(201).json(task);
});

app.listen(PORT, () => {
  console.log(`API (solo POST) en http://localhost:${PORT}`);
});

app.put("/tasks/:id", (req, res) => {
  try {
    const taskId = parseInt(req.params.id);

    if (isNaN(taskId)) {
      return res.status(400).json({
        error: "ID inválido",
        message: "El ID debe ser un número",
      });
    }

    const taskIndex = tasks.findIndex((task) => task.id === taskId);

    if (taskIndex === -1) {
      return res.status(404).json({
        error: "Tarea no encontrada",
        message: `No existe una tarea con el ID ${taskId}`,
      });
    }

    const { title, completed } = req.body;

    if (title === undefined && completed === undefined) {
      return res.status(400).json({
        error: "Datos faltantes",
        message:
          "Debes proporcionar al menos un campo para actualizar (title o completed)",
      });
    }

    if (completed !== undefined && typeof completed !== "boolean") {
      return res.status(400).json({
        error: "Tipo de dato inválido",
        message: 'El campo "completed" debe ser un booleano (true o false)',
      });
    }

    if (title !== undefined) {
      if (typeof title !== "string" || title.trim().length === 0) {
        return res.status(400).json({
          error: "Título inválido",
          message: "El título debe ser una cadena de texto no vacía",
        });
      }
    }

    const updatedTask = {
      ...tasks[taskIndex],
      ...(title !== undefined && { title: title.trim() }),
      ...(completed !== undefined && { completed }),
    };

    tasks[taskIndex] = updatedTask;

    console.log(
      `✅ Tarea actualizada: ID ${taskId}, Completada: ${updatedTask.completed}`,
    );

    return res.status(200).json(updatedTask);
  } catch (error) {
    console.error("Error al actualizar tarea:", error);
    return res.status(500).json({
      error: "Error interno del servidor",
      message: "Ocurrió un error al procesar la solicitud",
    });
  }
});

app.patch("/tasks/:id/complete", (req, res) => {
  try {
    const taskId = parseInt(req.params.id);

    if (isNaN(taskId)) {
      return res.status(400).json({
        error: "ID inválido",
        message: "El ID debe ser un número",
      });
    }

    const taskIndex = tasks.findIndex((task) => task.id === taskId);

    if (taskIndex === -1) {
      return res.status(404).json({
        error: "Tarea no encontrada",
        message: `No existe una tarea con el ID ${taskId}`,
      });
    }

    tasks[taskIndex].completed = true;

    console.log(`✅ Tarea ${taskId} marcada como completada`);

    return res.status(200).json(tasks[taskIndex]);
  } catch (error) {
    console.error("Error al completar tarea:", error);
    return res.status(500).json({
      error: "Error interno del servidor",
      message: "Ocurrió un error al procesar la solicitud",
    });
  }
});

app.patch("/tasks/:id/uncomplete", (req, res) => {
  try {
    const taskId = parseInt(req.params.id);

    if (isNaN(taskId)) {
      return res.status(400).json({
        error: "ID inválido",
        message: "El ID debe ser un número",
      });
    }

    const taskIndex = tasks.findIndex((task) => task.id === taskId);

    if (taskIndex === -1) {
      return res.status(404).json({
        error: "Tarea no encontrada",
        message: `No existe una tarea con el ID ${taskId}`,
      });
    }

    // Marcar como pendiente
    tasks[taskIndex].completed = false;

    console.log(`⏳ Tarea ${taskId} marcada como pendiente`);

    return res.status(200).json(tasks[taskIndex]);
  } catch (error) {
    console.error("Error al actualizar tarea:", error);
    return res.status(500).json({
      error: "Error interno del servidor",
      message: "Ocurrió un error al procesar la solicitud",
    });
  }
});
