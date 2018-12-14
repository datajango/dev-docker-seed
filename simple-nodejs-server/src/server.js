'use strict';

const express = require('express');

// Constants
const PORT = 4300;
const HOST = '0.0.0.0';
//const HOST = 'localhost';

// App
const app = express();
app.get('/', (req, res) => {
  res.send('Hello world, 2\n');
});

app.get('/id', (req, res) => {
  res.json({id:104});
});

app.get('/name/:name', (req, res) => {
  res.json({name: req.params.name});
});

app.get('/names', (req, res) => {
  res.json({names: [
    { name: "tony" },
    { name: "stacy" },
    { name: "allison" }
  ]});
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);