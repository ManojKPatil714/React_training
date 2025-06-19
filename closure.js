const outerFunction = () => {
    let outerVariable = 'I am from the outer function';
    let counter = 0;

  const innerFunction = () => {
    console.log("show counter first ", counter++);//show 0 
    console.log("show outer variable ", outerVariable); // show 'I am from the outer function'
    console.log('show ..inner function ................END..');// show '..inner function ................END..'
  };
  
  return innerFunction;
}

const innerFunction = outerFunction();
innerFunction(); // show all console from inerFunction
innerFunction(); // show all console from inerFunction
innerFunction(); // show all console from inerFunction

function makeMultiply(multiplier) {

    return function (number) {
        return number * multiplier;
    }
}

const double = makeMultiply(2);
console.log("call makeMultiply function ", double(5)); 

const triple = makeMultiply(30);
console.log("call makeMultiply function again ",triple(15)); // 150

//Closure is a combination of function bundled together (enclosed) with references to its surrounding state (the lexical environment)
// closure gives you access to an outer functions variable and functions from an inner function