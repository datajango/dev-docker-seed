'use strict';

const express = require('express');

// Constants
const PORT = 4300;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/', (req, res) => {
  res.send('Hello world\n');
});

app.get('/id', (req, res) => {
  res.json({id:104});
});

app.get('/name/:name', (req, res) => {
  res.json({name: req.params.name});
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);