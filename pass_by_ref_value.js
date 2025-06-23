// pass by reference  value
// This code demonstrates the concept of passing by reference and value in JavaScript.
let a = 10;
let b = a; // Pass by value
console.log(b); // Output: 10

a = 20; // Changing 'a' does not affect 'b'
console.log(b); // Output: 10
let obj1 = { value: 10 };
let obj2 = obj1; // Pass by reference
console.log(obj2.value); // Output: 10
obj1.value = 20; // Changing 'obj1' affects 'obj2'
console.log(obj2.value); // Output: 20
