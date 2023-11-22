### Disable stats by doing
```js
const options = {
  timeout: 3000,
  errorThresholdPercentage: 50,
  resetTimeout: 30000,
  enableSnapshots: false,
  rollingPercentilesEnabled: false
};
const breaker = new CircuitBreaker(asyncFunctionThatCouldFail, options);
```

### Profiling looks promissing - no stats

<img src="disable-stats.png"></img>