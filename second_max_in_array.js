//find second max in array
// This code finds the second maximum value in an array by first finding the maximum value.

const arrayFind = [5, 3, 8, 4, 2, 1, 4, 2, 8, 5, 3];
function findSecondMax(arr) {
    let max = null;
    let secondMax = null;
    for(let i = 0; i < arr.length; i++){
        if(max === null || arr[i] > max) {
            secondMax = max;
            max = arr[i];
        }
    }
    return secondMax;
}
console.log(findSecondMax(arrayFind)); // Output: 5