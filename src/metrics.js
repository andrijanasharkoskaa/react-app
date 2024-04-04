const express = require('express');
const promClient = require('prom-client');

const app = express();
const port = 3000;

const counter = new promClient.Counter({
  name: 'my_counter',
  help: 'Example of a counter metric',
});

app.get('/metrics', (req, res) => {
  res.set('Content-Type', promClient.register.contentType);
  res.end(promClient.register.metrics());
});

app.get('/increment', (req, res) => {
  counter.inc();
  res.send('Counter incremented');
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
