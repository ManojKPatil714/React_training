// string repeat methods
// Using String.prototype.repeat() method 
// to repeat a string multiple times

const userName = "Mohammad";
const output = userName.repeat(5);
console.log(output); // Output: MohammadMohammadMohammadMohammadMohammad

// Using a custom function to repeat a string
// using recursion
// This function repeats a string a specified number of times
// and returns the concatenated result.
const repeatString = (str, sum = str, count = 3) => {
    if(count <= 1) {
        return sum;
    }
    count--;
    return repeatString(str, sum + str, count);
}
console.log(repeatString("Maharashtra", "Pune", 2)); //output: PuneMaharashtra

repeatString('ABC'); // Output: ABCABCABC

