//swap numbers using different methods


let a = 5;
let b = 10;
// Using destructuring assignment to swap values
[a, b] = [b, a];
console.log(a, b); // Output: 10 5


// Using a temporary variable to swap values
let temp = a;
a = b;
b = temp;
console.log(a, b); // Output: 10 5


// Using arithmetic operations to swap values
a = a + b; // a becomes 15
b = a - b; // b becomes 5
a = a - b; // a becomes 10
console.log(a, b); // Output: 10 5
