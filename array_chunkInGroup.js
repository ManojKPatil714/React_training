//chunk array
// This function takes an array and a size as arguments and returns a new array containing chunks of the original array.
// Each chunk is an array of the specified size, and the last chunk may be smaller if the original array's length is not a multiple of the size.
const inputElements = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const resultArray = [];

const chunkArrayInGroups = (arr, size) => {

    for (let i = 0; i < arr.length; i += size) {
        resultArray.push(arr.slice(i, i + size));
    }
    return resultArray;
}

console.log(chunkArrayInGroups(inputElements, 2)); 

// Another way to chunk an array using splice
// This method modifies the original array

const chunkArray = (arr, size) => {
    const result = [];
    while (arr.length) {
        result.push(arr.splice(0, size));        
    }
    return result;
}
console.log(chunkArray(inputElements, 3)); 


// Another way to chunk an array using reduce
const inputArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const chunkArrayReduce = (arr, size) => {
    return arr.reduce((acc, _, index) => {
        if (index % size === 0) {
            acc.push(arr.slice(index, index + size));
        }
        return acc;
    }, []);
}
console.log("chunk array reduce");
console.log(chunkArrayReduce(inputArray, 3)); // Output: [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10]]