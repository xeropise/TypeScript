Promise.race([Promise.resolve(true), Promise.resolve('hello')])
    .then(value => console.log(value))

Promise.race([Promise.resolve(true), Promise.resolve(new Error('hello'))])    
    .then(value => console.log(value))
    .catch(error => console.log(error.message))

Promise.race([Promise.reject(new Error('error')), Promise.resolve(true)])    
    .then(value => console.log(value))
    .catch(error => console.log(error.message))

// race 는 배열 안에 Promise 순서의 영향을 받는다.    