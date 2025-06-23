//find vowel counts in a string
// This code counts the number of vowels in a given string and returns an object with the counts for each vowel.

const findVowelCounts = (str) => {
    const vowels = ['a', 'e', 'i', 'o', 'u'];
    const counts = {};

    for (let char of str) {
        if (vowels.includes(char)) {
            char = char.toLowerCase(); // Normalize to lowercase
            counts[char] = (counts[char] || 0) + 1; // Increment count for the vowel
        }
    }

    return counts;
}

// Example usage
const inputString = "Hello World! This is a simple test string.";
const vowelCounts = findVowelCounts(inputString);
console.log(vowelCounts); // Output: { e: 2, o: 2, i: 3, a: 1 }
