## 07-3 async와 await 구문

- async/await 구문 예

```typeScript
const test = async ()  => {
  const value = await Promise.resolve(1)
  console.log(value)    // 1
}
```


***


#### await 키워드

- await 키워드는 피연산자(operatnd)의 값을 반환해 준다. 그런데 Promise 객체이면 then 메서드를 호출해 얻은 값을 반환해 준다.

```typeScript
let value = await Promise 객체 혹은 값
```


***


#### async 함수 수정자

- await 키워드는 항상 async라는 이름의 함수 수정자(function modifier)가 있는 함수 몸통에서만 사용 가능

```typeScript
const test1 = async() => {    // 화살표 함수 구문
    await Promise 객체 혹은 값
}
async function test2() {     // function 키워드 함수 구문
    await promise 객체 혹은 값
}
```

- 화살표 함수 형태로 async 함수 구현 예 

_test1.ts_

```typeScript
export const test1 = async () => {
    let value = await 1
    console.log(value)  // 1
    value = await Promise.resolve(1)
    console.log(value)  // 1
}
```

- function함수 형태로 async 함수 구현 예

_test2.ts_

```typeScript
export async function test2() {
    let value = await 'hello'
    console.log(value)  // hello
    value = await Promise.resolve('hello')
    console.log(value)      // hello
}
```

- async는 함수이므로 일반 함수처럼 호출할 수 있다.

_await-test.ts_

```typeScript
import {test1} from './test1'
import {test2} from './test2'

test1()
test2()
```


***


#### async 함수의 두 가지 성질

- async 함수 수정자가 붙은 함수는 다음의 특징이 있다.  

      - 일반 함수처럼 사용 가능
      - Promise 객체로 사용 가능
      
- async 함수를 Promise 객체로 사용한 예를 보자.

_async-as-promise.ts_

```typeScript
import {test1} from './test1'
import {test2} from './test2'

test1()
    .then(() => test2())
```


***


#### async 함수가 반환하는 값의 의미

- async 함수는 값을 반환할 수 있어, 반환값은 Promise 형태로 변환되므로, then 메서드를   
  호출해 async 함수의 반환 값을 얻어야 한다.
  
_async-return.ts_

```typeScript
const asyncReturn = async() => {
    return [1, 2, 3]
}

asyncReturn()
    .then(value => console.log(value))      // [1, 2, 3]
```


***


#### async 함수의 예외 처리

- async 함수에서 다음처럼 예외가 발생하면 프로그램이 비정상적으로 죵로된다.

```typeScript
const asyncException = async () => {
    throw new Error('erro')
}
asyncException()    // 예외 발생
```

- 예외가 발생해서 프로그램이 비정상으로 종료하는 상황을 막으려면, asyncException()이 반환하는  
  promise 객체의 catch 메서드를 호출하는 형태로 코드를 작성해야 한다.
  
_async-exception.ts_

```typeScript
const asyncException = async () => {
    throw new Error('error')
}
asyncException()
    .catch(err => console.log('error:', err.message))       // erro: error
```

- 만일 await 구문에서 Promise.reject 값이 발생하면 앞에서와 마찬가지로 프로그램이 비정상적으로 종료

```typeScript
const awaitReject = async() => {
    await Promise.reject(new Error('erro'))
}
awaitReject()     // 비정상 종료
```

- 이러한 방식으로 구현하면 비정상으로 종료하는 것을 방지할 수 있다.

_await-reject.ts_

```typeScript
const awaitReject = async() => {
    await Promise.reject(new Error('error'))
}

awaitReject()
    .catch(err => console.log('error:', err.message))       // error: error
```


***


#### async 함수와 Promise.all

- 앞에서 구현했던 ch07-2의 readFile 을 Promise로 만든 readFilePromise.ts를 async 함수에 적용해 보자.

_async_readFilePromise-test.ts_

```typeScript
import {readFilePromise} from './readFilePromise'

const readFilesAll = async (filenames: string[]) => {
    return await Promise.all(
        filenames.map(filename => readFilePromise(filename))
    )
}

readFilesAll(['./package.json', './tsconfig.json'])
    .then(([packageJson, tsconfigJson]: string[]) => {
        console.log('<package.json> ', packageJson)
        console.log('<tsconfig.json>: ', tsconfigJson)
    })
    .catch(err => console.log('erro: ', err.message))
```

