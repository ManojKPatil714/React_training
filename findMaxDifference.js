//find max difference in array
// This code finds the maximum difference between any two elements in an array.
const findMaxDifference = (arr) => {
    if (arr.length < 2) {
        return 0; // Not enough elements to find a difference
    }

    let max = arr[0];
    let min = arr[0];

    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
        if (arr[i] < min) {
            min = arr[i];
        }
    }

    return max - min;
}

// Example usage
const array = [1,2,3,4,5];
console.log(findMaxDifference(array)); // Output: 4 (5 - 1)