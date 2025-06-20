// This code takes a string, splits it into words, converts each word to uppercase, and then joins them back together.
const userInfo = "convert this string to uppercase";

const result = userInfo.split(' ').map(word => {
    return word.toUpperCase();
}).join(' ');
console.log(result);
// Output: "CONVERT THIS STRING TO UPPERCASE" - converts each word in the string to uppercase


const input = "convert first char into uppercase for every word of sentence";

const resultUserInfo = (input) => {
    return input
        .split(' ') //split(' '): Splits the string into an array of words.
        .map((word) => {
        return word[0].toUpperCase() +  //word[0].toUpperCase(): Capitalizes the first letter of each word.
        word.slice(1) //word.slice(1): Keeps the rest of the word as-is.
    }).join(' ')
}

console.log(resultUserInfo(input)) 
// Output: "Convert First Char Into Uppercase For Every Word Of Sentence" 
