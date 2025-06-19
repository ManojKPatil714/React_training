//Closure - Closure is a combination of function bundled together (enclosed) with references to its surrounding state (the lexical environment)
// closure gives you access to an outer functions variable and functions from an inner function

function makeCounter() {
    let count = 0; // This variable is enclosed in the closure

    return function() {
        count += 1; // Accessing and modifying the outer function's variable
        console.log(`Count is: ${count}`);
        return count;
    };
    
}

const counter = makeCounter(); // Create a new counter instance
console.log("Counter created. Now you can use it.");
// Using the counter
counter(); // Count is: 1
counter(); // Count is: 2

function makeMultiplier(Multiply) {
    return function(number) {
        return number * Multiply; // Accessing the outer function's variable 'factor'
    };
}
const double = makeMultiplier(2); // Create a multiplier that doubles the number
console.log(double(5)); // 10
const triple = makeMultiplier(3); // Create a multiplier that triples the number
console.log(triple(5)); // 15
