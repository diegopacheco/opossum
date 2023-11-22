/* eslint-disable no-console  */
/* eslint-disable no-unused-vars */

const express = require('express');
const app = express();
const port = 8080;

const CircuitBreaker = require('opossum');
const options = {
  timeout: 3000,
  errorThresholdPercentage: 50,
  resetTimeout: 30000,
  enableSnapshots: false,
  rollingPercentilesEnabled: false
};

const breaker = new CircuitBreaker(asyncFunctionThatCouldFail, options);

function asyncFunctionThatCouldFail (_x, _y) {
  return new Promise((resolve, _reject) => {
    console.log('*** here ***');
    resolve();
  });
}

function dummyProc () {
  console.log('200');
  return 200;
}

app.get('/', (req, res) => {
  breaker.fire(dummyProc())
    .then(r => `Result from breaker:" ${r}`)
    .catch(e => `Error from breaker:" ${e}`);
  res.send('Hello World stinky animal!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
