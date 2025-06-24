//Synchronous code runs first before any async tasks.
//Microtasks (Promise.then) run before macrotasks (setTimeout).
//setTimeout(…, 0) executes after the current execution cycle.
//Node.js: setImmediate(…) may execute before setTimeout(…, 0).
//Nested setTimeout(…) executes in the next event loop cycle.

console.log("start");
setTimeout(() => console.log("timeout"), 0);
Promise.resolve().then(() => console.log("Promise"));
console.log("End");

setTimeout(() => console.log("Timeout 1"), 100);
setTimeout(() => console.log("Timeout 2"), 50);

console.log("log 1");
setTimeout(() => console.log("timeout 3"), 0);
console.log("log 2");

