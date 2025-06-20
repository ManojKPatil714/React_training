//Palindrome number checker
const isPalindrome = (string) => {
    // Check if the string is the same forwards and backwards
    return string === string.split('').reverse().join('');
}

console.log(isPalindrome("madam")); // true
console.log(isPalindrome("manoj")); // false