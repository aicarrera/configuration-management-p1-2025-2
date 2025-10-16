const express = require('express');
const app = express();
app.use(express.json());

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
let tasks = [
    { id: 1, title: 'Aprender Git', done: false },
    { id: 2, title: 'Hacer el workshop', done: false }
];

app.get('/tasks', (req, res) => {
    res.json(tasks);
});
  