// Given an array of integers, find two numbers such that they add up to zero.

const Input = [-5,-4,-3,-2,-1,0,1,2,3,4,5];

function findZeroSum(data) {
  let left = 0;
  let right = data.length - 1;
  while (left < right) {
    const sum = data[left] + data[right];
    if (sum === 0) return [data[left], data[right]];
    sum > 0 ? right-- : left++;
  }
}

console.log(findZeroSum(Input))

// Output: [-5, 5] or any other pair that sums to zero
//create same function using different approach

const findZeroSumSet = (data) => {
    const seen = new Set();
    for (const num of data) {
        if (seen.has(-num)) {
            return [num, -num];
        }
        seen.add(num);
    }
    return null; // No pair found
}
console.log(findZeroSumSet(Input))


