//Factorial numbers
// This function calculates the factorial of a number using recursion.

const factorial = (n) => {
    if( n === 0 || n === 1) {
        return 1;
    } else {
        return n * factorial(n - 1);
    }
}

console.log(factorial(3)); // Output: 6

// This function calculates the factorial of a number using iteration.
const factorialIteration = (n) => {
    let result = 1;
    for(let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}
console.log(factorialIteration(7)); // Output: 5040