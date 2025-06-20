// This code removes duplicate characters from a string
// This code takes a string input and removes duplicate characters, returning a new string with only unique characters.
const userInput = "Manoj Kumar Sharma";
const result = userInput.split('').filter((acc, index) => {
    console.log(acc, index);
    return userInput.indexOf(acc) === index;
}).join('');
console.log(result);
// Output: "Helo, Wrld!" - removes duplicate characters from the string
