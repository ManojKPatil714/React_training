// generator allow pausing and resuming execution using the `yield` keyword.

// This function generates a sequence of numbers from 1 to n using a generator function.

function* numberGenerator(n) {
    for (let i = 1; i <= n; i++) {
        yield i; // Yield the current number
    }
}
// Example usage
const gen = numberGenerator(5);
for (const num of gen) {
    console.log(num); // Output: 1, 2, 3, 4, 5
}
