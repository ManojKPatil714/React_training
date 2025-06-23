// Reverse string 

// This function reverses a given string using the built-in split, reverse, and join methods.
// This code reverses a string and also reverses each word in the string separately.
const stringReverse = "interview practice session";
const result = stringReverse.split('').reverse().join('');
console.log(result); 
// Output: "noisses ecitcarp weivretni" - reverses the entire string

// This code reverses each word in the string separately and joins them back together.
const resultAnotherway  = stringReverse.split(' ').map((data) => {
    return data.split('').reverse().join('')
})
console.log(resultAnotherway.join(' '));

// Output:
// "weivretni ecitcarp noisses" - reverses each word in the string


