const input = [
    { name: 'Sachin', count: 10 },
    { name: 'jasim', count: 11 },
    { name: 'sachin', count: 1 },
    { name: 'jasim', count: 5 },
    { name: 'debanshu', count: 30 },
    { name: 'jana', count: 25 },
    { name: 'debanshu', count: 1 }
];

function nameCountAggregate(arr) {
    const resultObj = {};
    for (const item of input) {
        const key = item.name.toLowerCase();
        if (resultObj[key]) {
            resultObj[key].count += item.count;
        } else {
            resultObj[key] = { ...item };
        }
    }
    return Object.values(resultObj)
}

console.log(nameCountAggregate(input));

//Output :
// [
//   { name: 'Sachin', count: 11 },
//   { name: 'jasim', count: 16 },
//   { name: 'debanshu', count: 31 },
//   { name: 'jana', count: 25 }
// ]