Promise.resolve(1)
    .then((value: number) => {
        console.log(value)
        return Promise.resolve(true)
    })
    .then((value: boolean) => {        // Promise로 반환된것이 아니기 때문에 출력 순서에 문제가 있을 수 있다.
        console.log(value)
        return [1, 2, 3]
    })
    .then((value: number[]) => {
        console.log(value)
        return {name: 'jack', age: 32}
    })
    .then((value: {name: string, age: number}) => {
        console.log(value)
    })