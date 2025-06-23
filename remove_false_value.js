// remove false values from an array
// This code removes all false values (0, false, '', null, undefined) from an array and 
// returns a new array with only truthy values.
const removeFalseValues = (arr) => {
    const result = [];
    for(let val of arr){
        if(val) {
            result.push(val);
        }
    }
    return result;
}
// Example usage
const arrayWithFalseValues = [0, 1, false, 2, '', 3, null, 4, undefined, 5];
console.log(removeFalseValues(arrayWithFalseValues)); // Output: [1, 2, 3, 4, 5]



//remove duplicates from an array
const arrayWithDuplicates = [1, 2, 2, 3, 4, 4, 5];
const removeDuplicates = (arr) => {
    const uniqueValues = new Set(arr);
    return Array.from(uniqueValues);
}
// Example usage
console.log(removeDuplicates(arrayWithDuplicates)); // Output: [1, 2, 3, 4, 5]
