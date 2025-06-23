//recusrsive function to generate Fibonacci sequence

const fibonacci = (n) => {
    if(n <= 0) {
        return [];
    } else if(n === 1) {
        return [0];
    } else if(n === 2) {
        return [0, 1];
    } else {
        const seq = fibonacci(n - 1);
        seq.push(seq[seq.length - 1] + seq[seq.length - 2]);
        return seq;
    }
}

console.log(fibonacci(10)); // Output: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]

// Iterative function to generate Fibonacci sequence
const fibonacciIterative = (n) => {
    const seq = [];
    for(let i = 0; i < n; i++) {
        if(i === 0) {
            seq.push(0);
        } else if(i === 1) {
            seq.push(1);
        } else {
            seq.push(seq[i - 1] + seq[i - 2]);
        }
    }
    return seq;
}
console.log(fibonacciIterative(7)); // Output: [0, 1, 1, 2, 3, 5, 8]

// Recursive function to calculate Fibonacci number
// This function returns the nth Fibonacci number.
const fibbonaccirecrusive = (n) => {
    if(n <= 1) {
        return n;
    } else {
        return fibbonaccirecrusive(n - 1) + fibbonaccirecrusive(n - 2);
    }
}
console.log(fibbonaccirecrusive(10)); // Output: 55
console.log(fibbonaccirecrusive(1)); // Output: 1
console.log(fibbonaccirecrusive(0)); // Output: 0