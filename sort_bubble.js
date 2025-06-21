//bubble sort methods

// Bubble sort implementation in JavaScript
let sortArray1 = [5, 3, 8, 4, 2];
let sortArray2 = [1, 4, 2, 8, 5, 3];

//merge array
let mergeArray = sortArray1.concat(sortArray2);
console.log(mergeArray); // Output: [ 5, 3, 8, 4, 2, 1, 4, 2, 8, 5, 3 ]


// Bubble sort function
// This function sorts an array using the bubble sort algorithm.
for(let i =0; i < mergeArray.length - 1; i++) {
    for( let j = 0; j < mergeArray.length - i - 1; j++) {
        if(mergeArray[j] > mergeArray[j + 1]) {
            const temp = mergeArray[j];
            mergeArray[j] = mergeArray[j + 1];
            mergeArray[j + 1] = temp;
        }
    }
}
console.log(mergeArray); // Output: [ 1, 2, 3, 4, 5, 5, 8, 8 ]

