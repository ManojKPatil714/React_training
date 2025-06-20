// A Promise is an object representing the result of an asynchronous operation, 
// which can be in one of three states: pending, fulfilled, or rejected 
// You work with it using methods like .then(), .catch(), and .finally().


function fetchData() {
    return fetch('https://jsonplaceholder.typicode.com/posts/1')
        .then(response => {
            if(!response.ok)  throw new Error('Network response was not ok');            
            return response.json();
        });

}

    // Using async/await to handle promises
    //Inside an async function, await pauses execution until the given Promise resolves (or rejects) and returns its result.
async function userData(){
    try{
        const responce = await fetch('https://jsonplaceholder.typicode.com/users/1');
        const data = await responce.json();
        console.log(data);
    } catch(err) {
        console.error('Error fetching user data:', err);
    }
    
}
userData();

// Parallel start, then await:
// This is useful when you want to start multiple asynchronous operations at the same time and wait for all of them to complete.
// This can improve performance by not waiting for each operation to complete sequentially.
async function fetchUserInfo() {
    const p1 = fetch('https://jsonplaceholder.typicode.com/users/1');
    const p2 = fetch('https://jsonplaceholder.typicode.com/users/2');
    const [resA, resB] = await Promise.all([p1, p2]);
    const dataA = await resA.json();
    const dataB = await resB.json();
    console.log(dataA, dataB);
    
}
fetchUserInfo();


