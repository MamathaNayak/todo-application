

const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;
const todosFilePath = path.join(__dirname, 'todos.json');


app.use(express.json());


app.get('/', (req, res) => {
    res.send('Server is running');
});



app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.get('/api/todos', (req, res) => {
  fs.readFile(todosFilePath, 'utf-8', (err, data) => {
    if (err) {
      console.error('Error reading todos file:', err);
      return res.status(500).send('Internal Server Error');
    }
    res.json(JSON.parse(data));
  });
});


app.post('/api/todos', (req, res) => {
  const todos = req.body;

  fs.writeFile(todosFilePath, JSON.stringify(todos), (err) => {
    if (err) {
      console.error('Error writing todos file:', err);
      return res.status(500).send('Internal Server Error');
    }
    res.sendStatus(200);
  });
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
