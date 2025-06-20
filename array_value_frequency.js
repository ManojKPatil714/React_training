//counts of each unique number, using the number as the key.
// Count the frequency of each unique number in an array
// This function takes an array and returns an object with the frequency of each element.

const arrayValue = [1, 2, 3, 10, 1, 2, 3, 4, 5];
const result ={}

arrayValue.map((arrayValue, index) => {

    console.log(arrayValue, index, result[arrayValue]);

    if (result[arrayValue]) {
        console.log(result[arrayValue])
        result[arrayValue] += 1;
    } else {
        result[arrayValue] = 1;
    }
});
console.log(result); 
// Output: { '1': 2, '2': 2, '3': 2, '10': 1, '4': 1, '5': 1 }


// Another way to count the frequency of each unique number in an array
// This function takes an array and returns an object with the frequency of each element.
const data = [1, 2, 3, 4, 3, 2, 3, 1, 1];

const output = {}
data.map((data, index) => {
    console.log(data, index, output[data])
    if(output[data]){
        console.log(output[data])
        output[data] = output[data] + 1;
    }else {
        output[data] = 1;
    }
})

console.log(output); 
//output: {1: 3, 2: 2, 3: 3, 4: 1}
