const outerFunction = () => {
    let outerVariable = 'I am from the outer function';
    let counter = 0;

  const innerFunction = () => {
    console.log(counter++);
    console.log(outerVariable);
    console.log('..................END..');
  };
  
  return innerFunction;
}

const innerFunction = outerFunction();
innerFunction(); // 0, I am from the outer function
innerFunction();
innerFunction();

function makeMultiply(multiplier) {

    return function (number) {
        return number * multiplier;
    }
}

const double = makeMultiply(2);
console.log(double(5)); // 10

const triple = makeMultiply(30);
console.log(triple(15)); // 150

