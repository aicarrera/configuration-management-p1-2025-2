

app.post('/tasks', (req, res) => {
    const { title } = req.body || {};
    if (!title) return res.status(400).json({ error: 'title requerido' });
    const task = { id: nextId++, title, completed: false };
    tasks.push(task);
    res.status(201).json(task);
  });
  
  app.put('/tasks/:id', (req, res) => {
    const id = Number(req.params.id);
    const found = tasks.find(t => t.id === id);
    if (!found) return res.status(404).json({ error: 'no existe' });
    found.completed = true;
    res.json(found);
  });
  
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(API escuchando en http://localhost:${PORT}));