// different array element

const diffArrayElement = (arr1, arr2) => {
 

  return [
    ...arr1.filter((num) => !arr2.includes(num)),
    ...arr2.filter((num) => !arr1.includes(num))
  ];
}

console.log(diffArrayElement([1, 2, 3], [1, 2, 4])); // Output: [3, 4]
console.log(diffArrayElement([1, 2, 3, 4, 7, 0], [2, 3, 4, 5, 8, -1, -3])); // Output: [1, 5, 7, 0, 8, -1, -3]
