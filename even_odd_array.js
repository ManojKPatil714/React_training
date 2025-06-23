//create even and odd arrays from a given array

const arrayNumbers = [3, 4, 5, 6, 7, 8, 9, 10];
const evenArray = [];
const oddArray = [];

for(let i=0; i < arrayNumbers.length; i++){ 
    if(arrayNumbers[i] % 2 === 0) {
        evenArray.push(arrayNumbers[i]); 
    } else {
        oddArray.push(arrayNumbers[i]); 
    }
}
console.log("Even Array:", evenArray); 
console.log("Odd Array:", oddArray); 

//another way to create even and odd arrays from a given array
// Use reduce to create an object with even and odd arrays
const evenOddArray = arrayNumbers.reduce((acc, num) => { 
    if(num % 2 === 0){  
        acc.even.push(num); 
    } else {
        acc.odd.push(num); 
    }
    return acc; 
}, { even: [], odd: [] }); 
console.log("Even Array using reduce:", evenOddArray.even); 
console.log("Odd Array using reduce:", evenOddArray.odd); 

