//hoisting with var
// This code demonstrates the concept of hoisting in JavaScript with `let` and `const`.

console.log(hoistedVar); // Output: undefined
var hoistedX = 10;

function hoistedFunction() {
    console.log(hoistedY); // Output: undefined
    var hoistedY = 15; 
    console.log(hoistedY); // Output: 15
}
hoistedFunction(); 

console.log(hoistedZ); // Output: ReferenceError: Cannot access 'hoistedZ' before initialization
var hoistedZ = function() {
    return 20;
};
hoistedZ(); // This will throw an error because `hoistedZ` is not initialized yet.

// Hoisting with `let` and `const`
console.log(hoistedLet); 
let hoistedLet = 30; 

function checkTempDeadZone() {
    console.log(hoistedA);
    const hoistedA = 40; 
    console.log(hoistedA); 
}

checkTempDeadZone(); 

if (true) {
    console.log(hoistedB); 
    let hoistedB = 50;
}
// This will throw a ReferenceError because `hoistedB` is in the Temporal Dead Zone


//hoisting with nested functions
var outerVar = "I'm outside!";

function outerFunction() {
    console.log(outerVar); 
    var outerVar = "I'm inside!";
    
    innerFunction() 
}

function innerFunction() {
    console.log(outerVar); 
} 

outerFunction(); 
// This will output:
// ReferenceError: Cannot access 'outerVar' before initialization
// The inner function tries to access `outerVar` before it has been initialized in the outer function.


//hoisting in loops

for (var i = 0; i < 5; i++) {
    setTimeout(function() {

    console.log(i); 
    }, 1000);
}
// This will output: 0, 1, 2, 3, 4

//hoisting function
// This code demonstrates hoisting with function declarations.
newHoistingFunction();

function newHoistingFunction(){
    console.log("This function is hoisted!");
}

newHoistingFunction = function() {
    console.log("This function is not hoisted!");
}
newHoistingFunction();
// This will throw an error because the function expression is not hoisted.

