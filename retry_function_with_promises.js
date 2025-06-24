function retryWithPromise(fn, retries, delay) {
    return new Promise((resolve, reject) => {
      const tryCall = attempt => {
        fn().then(resolve).catch(error => {
          if (attempt < retries) {
            setTimeout(() => tryCall(attempt + 1), delay);
          } else {
            reject(error);
          }
        });
      };
  
      tryCall(0);
    });
  }
  
  // Example usage:
  const fetchData = () => {
    const randomNumber = Math.random();
    return new Promise((resolve, reject) => {
      if (randomNumber > 0.8) {
        resolve('Data fetched successfully!');
      } else {
        reject('Error: Failed to fetch data.');
      }
    });
  };
  
  retryWithPromise(fetchData, 3, 1000)
    .then(data => console.log(data))
    .catch(error => console.error(error));