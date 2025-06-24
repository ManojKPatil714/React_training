//
const transposeMatrix = (matrix) => {
    const row = matrix[0].length;
    const columns = matrix.length;
    // console.log(row, columns)
    
 const transposedMatrix = new Array(columns).fill(null).map(() => new Array(row));

    for(i=0; i<row; i++){
        for(j=0; j<columns; j++){
            // console.log(matrix[i], matrix[j])
            transposedMatrix[i][j] = matrix[j][i]
        }
    }
    console.log(transposedMatrix)
}


// Example usage:
const matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

console.log(transposeMatrix(matrix))
// console.log(transposeMatrix(matrix));