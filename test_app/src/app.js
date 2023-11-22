/* eslint-disable no-console */

const express = require('express');
const app = express();
const port = 8080;

const CircuitBreaker = require('opossum');

function asyncFunctionThatCouldFail (_x, _y) {
  return new Promise((resolve, reject) => {
    console.log('*** here!');
    console.log(resolve);
    console.log(reject);
  });
}

function dummyProc () {
  console.log('ok');
}

app.get('/status', (req, res) => {
  const options = {
    timeout: 3000,
    errorThresholdPercentage: 50,
    resetTimeout: 30000
  };
  console.log('Status', CircuitBreaker.newStatus(options));
  res.send(CircuitBreaker.newStatus(options));
});

app.get('/', (req, res) => {
  const options = {
    timeout: 3000,
    errorThresholdPercentage: 50,
    resetTimeout: 30000
  };
  const breaker = new CircuitBreaker(asyncFunctionThatCouldFail, options);

  breaker.fire(dummyProc())
    .then(console.log)
    .catch(console.error);
  res.send('Hello World stinky animal!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
