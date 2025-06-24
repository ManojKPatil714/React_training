// 

const checkBalance = (input) => {
    const brackets = {
        '(':')',
        '{':'}',
        '[': ']'
    }
    
    // console.log(Object.values(brackets))
    const temp = [];
    
    for(let char of input) {
        if(brackets[char]){
            temp.push(char)
        } else if(Object.values(brackets).includes(char)) {
            const last = temp.pop();
            // console.log('last', last, char)
            if(brackets[last] !== char){
                return false
            }
        }
    }
    // console.log(temp)
    return temp.length === 0;
}

console.log(checkBalance('({})[{}]'));
