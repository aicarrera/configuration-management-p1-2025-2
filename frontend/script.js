  // Referencias a los elementos del DOM
  const tasksList = document.getElementById("tasks-list");
  const addTaskForm = document.getElementById("add-task-form");
  const apiBaseUrl = "http://localhost:3000"; // URL base del backend

document.addEventListener("DOMContentLoaded", () => {
  async function updateTaskStatus(taskId, isCompleted) {
        try {
            const response = await fetch(`${apiBaseUrl}/tasks/${taskId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ completed: isCompleted }),
            });

            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }

            // Refresca la lista para mostrar el cambio
            fetchAndDisplayTasks();
        } catch (error) {
            console.error('Error al actualizar la tarea:', error);
        }
    }
})

  /**
   * Función para obtener las tareas de la API y mostrarlas en la página.
   */
  async function fetchAndDisplayTasks() {
    try {
      const response = await fetch(`${apiBaseUrl}/tasks`);
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      const tasks = await response.json();

      tasksList.innerHTML = ""; // Limpiar la lista

      tasks.forEach((task) => {
        const taskElement = document.createElement("div");
        taskElement.classList.add("task-item");

        
        const taskText = document.createElement("span");
        taskText.textContent = `${task.title} `;
        // Si la tarea está completada, se tacha el texto
        if (task.completed) {
          taskText.style.textDecoration = "line-through";
        }

        const actionButton = document.createElement("button");
        actionButton.textContent = task.completed ? "Reabrir" : "Completar";
        actionButton.addEventListener("click", () => {
          // Llama a la función de actualizar con el estado opuesto al actual
          updateTaskStatus(task.id, !task.completed);
        });

        taskElement.appendChild(taskText);
        taskElement.appendChild(actionButton);
        tasksList.appendChild(taskElement);
      });
    } catch (error) {
      console.error("Error al obtener las tareas:", error);
      tasksList.innerHTML = "<p>No se pudieron cargar las tareas.</p>";
    }
  }

  /**
   * Event Listener para el formulario de añadir tarea.
   */
  addTaskForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // Evita que la página se recargue
    const taskTitleInput = document.getElementById("task-title");
    const title = taskTitleInput.value.trim();

    if (!title) return; 

    try {
      const response = await fetch(`${apiBaseUrl}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      taskTitleInput.value = ""; // Limpiar el campo de texto
      fetchAndDisplayTasks(); // Volver a cargar la lista de tareas para ver la nueva
    } catch (error) {
      console.error("Error al añadir la tarea:", error);
    }
  });

  // Carga inicial de las tareas cuando la página está lista
  fetchAndDisplayTasks();
});