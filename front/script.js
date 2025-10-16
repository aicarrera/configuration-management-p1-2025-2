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