//anagram 
// Given two strings, return true if they are anagrams of each other, false otherwise.

const cleanString = (string1, string2) => {

    const firstString = string1.split('').sort().join('');
    const secondString = string2.split('').sort().join('');
    return firstString === secondString;
}

console.log(cleanString("erwerw", "fsfss"));
console.log(cleanString("listen", "silent")); 

const cleanSpecialCharacters = (string1, string2) => {
    // Remove special characters and convert to lowercase
    const cleanStr1 = string1.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    const cleanStr2 = string2.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    // Sort the characters and compare
    return cleanStr1.split('').sort().join('') === cleanStr2.split('').sort().join('');
    
}

console.log(cleanSpecialCharacters("Check Special char", "special char check"));
console.log(cleanSpecialCharacters("Hello@123", "321@eHllo")); 