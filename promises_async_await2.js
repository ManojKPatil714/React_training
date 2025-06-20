// // Function that returns a promise
// // This function simulates an asynchronous operation that fetches data after a delay.
function fetchDataWithPromise() {
     return new Promise((resolve, reject) => {
       setTimeout(() => {
         const data = { name: "Manoj", age: 36 };
         resolve(data);
       }, 10000);
     });
 }
  
//   // Using the promise
//   console.log('promises start')
fetchDataWithPromise()
     .then(data => {
       console.log("Data fetched with Promise:", data);
     })
     .catch(error => {
       console.error("Error fetching data with Promise:", error);
   });

    console.log('promises end')
  

// Function that returns a promise
function fetchData() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const data = { name: "Manoj Patil", age: 35 };
        resolve(data);
      }, 1000);
    });
  }
  
  // Using async/await
  async function fetchDataWithAsyncAwait() {
    try {
      const data = await fetchData();
      console.log("Data fetched with async/await:", data);
    } catch (error) {
      console.error("Error fetching data with async/await:", error);
    }
  }
  
  // Call the async function
  console.log('async await start')
  fetchDataWithAsyncAwait();
  console.log('async await end')

  