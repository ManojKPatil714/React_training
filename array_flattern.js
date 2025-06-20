// Flatten an array using recursion
// This function takes a nested array and flattens it into a single-level array.
// It uses recursion to handle arrays of varying depths, ensuring that all elements are included in the final output.
const nestedArray = [1, [2, 3], [4, [5, 6]], 7, 8];

const flattenArray = (arr) => {

    const result = [];

    arr.forEach((item) => {
        if(Array.isArray(item)){
            result.push(...flattenArray(item));
        } else {
            result.push(item);
        }        
    });  
    return result;
}
 
console.log(flattenArray(nestedArray)); 

// Flatten an array with a different approach
// This function uses recursion to flatten a nested array into a single-level array.
// It checks each element, and if it finds an array, it calls itself recursively to flatten that array.
// If it finds a non-array element, it adds it to the result array.
const array = [1,2, [3,4, [5,6], [7,8], 9], [10, 11]];

const output = (arr, temp=[]) => {
    
    arr.map((data, i) => {
        if(Array.isArray(data)){
            return output(arr[i], temp)
        } else {
            temp.push(arr[i])
        }
    })
    return temp
}

console.log(output(array))
