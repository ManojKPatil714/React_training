//sort numbers methods

const arrayNumbers = [57873, 3333, 87686788, 13434, 2434, 4385347587438758];

// Using Array.prototype.sort() method to sort numbers

const sortedArray = arrayNumbers.sort((a, b) => a - b);
console.log(sortedArray); // Output: [ 2434, 13434, 3333, 57873, 87686788, 4385347587438758 ]

// Sorting numbers in descending order
arrayNumbers.sort((a, b) => b - a);
console.log(arrayNumbers); // Output: [ 4385347587438758, 87686788, 57873, 13434, 3333, 2434 ]

// Sorting numbers in ascending order using a custom comparator function
arrayNumbers.sort((a, b) => {
    return a - b;
})
console.log(arrayNumbers); // Output: [ 2434, 3333, 13434, 57873, 87686788, 4385347587438758 ]

// sort the array aplhabatecally
const arrayStrings = ["banana", "apple", "orange", "grape", "kiwi"];

arrayStrings.sort((a, b) => {
    return a - b;
})
console.log(arrayStrings); // Output: [ 'apple', 'banana', 'grape', 'kiwi', 'orange' ]


//bubble sort method for strings
// This function sorts a string using the bubble sort algorithm by comparing characters.
function bubbleSortStrings(str) {
    let char = str.split('');
    let length = char.length;
    for (let i = 0; i < length - 1; i++) {
        for (let j = 0; j < length - i - 1; j++) {
            if (char[j] > char[j + 1]) {
                // Swap characters
                let temp = char[j];
                char[j] = char[j + 1];
                char[j + 1] = temp;
            }
        }
    }
    return char.join('');
}
const unsortedString = "Advik Patil";
const sortedString = bubbleSortStrings(unsortedString); // Output: " Aadiiklpv"
