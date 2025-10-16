# Task Tracker

**Team Member:** Katherine Forero

---

## Backend Task

I developed the backend using Node.js and Express. My main responsibility was to implement the `GET /tasks` endpoint. This endpoint allows the frontend to request and receive a list of tasks in JSON format. The tasks are stored in a simple in-memory array, making it easy to test and demonstrate the functionality without needing a database.

- **How it works:**  
When a client (like the frontend) sends a GET request to `/tasks`, the server responds with the current list of tasks. This is useful for displaying all tasks to the user and serves as the foundation for further backend features.

---

## Frontend Task

I created the frontend using HTML, CSS, and JavaScript. My task was to build a web page that fetches the list of tasks from the backend and displays them in a visually appealing way.

- **How it works:**  
The frontend sends a request to the backend’s `/tasks` endpoint, receives the list of tasks, and dynamically displays them on the page. I used modern CSS to style the task list, making completed tasks visually distinct and ensuring the interface is user-friendly and attractive.

---

## Summary

In summary, I was responsible for both the backend and frontend integration:
- Setting up the backend API to provide task data.
- Building the frontend to consume that data and present it to the user with a clean design.

This ensures that users can see an up-to-date list of tasks, with a seamless connection between the backend and frontend components.
