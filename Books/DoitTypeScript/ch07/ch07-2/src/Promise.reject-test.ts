Promise.reject(new Error('에러 발생'))
    .catch((err: Error) => console.log('error:', err.message))
    