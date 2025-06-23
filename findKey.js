//find key 

const findkey = (obj, key) => {
    if(value in obj ) return obj[value];
    for (const k in obj) {
        if (k === key) return obj[k];
        if (typeof obj[k] === 'object') {
            const result = findkey(obj[k], key);
            if (result !== undefined) return result;
        }
    }
    return undefined;
}

// Example usage:
const data = { a: 1, b: { c: 2,  d: { e: 3, f: 4 } }, g: 5};
const keyToFind = 'e';
const value = findkey(data, keyToFind);
console.log(value); // Output: 3
// If the key is not found, it will return undefined
