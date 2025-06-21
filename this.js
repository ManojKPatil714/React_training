//using this
// Adding a last method to the Array prototype to get the last element

Array.prototype.last = function() {
    return this[this.length - 1];
}

console.log([1, 2, 3].last());
// Output: 3
// Using the last method in a function to find zero sum

//This keeps the core Array prototype untouched and avoids unexpected side effects 
// by extending the Array class instead of modifying the prototype directly.
// Using a class to extend Array and add a last method
class lastElement extends Array {
    last() {
        return this[this.length - 1];
    }
}

const arrayElement = new lastElement(1, 3, 5, 7, 9);
console.log( arrayElement.last());
// Output: 9
