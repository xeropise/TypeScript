## 07-2 Promise 이해하기

- 자바스크립트 ES5 버전에서 Promise 를 정식기능으로 채택

```typeScript
const promise = new Promise(콜백 함수)
```

- 여기서 Promise 콜백 함수는 resolve와 reject라는 두 개의 매개변수를 가진다.

```typeScript
(resolve, reject) => {}
```

- 타입스크립트에서는 Promise는 다음처럼 제네릭 클래스 형태로 사용

```typeScript
const numPromise: Promise<number> = new Promise<number>(콜백 함수)
const strPromise: Promise<string> = new Promise<string>(콜백 함수)
const arrayPromise: Promise<number[]> = new Promise<number[]>(콜백 함수)
```

```typeScript
new Promise<T>((
  resolve: (successValue: T) => void,
  reject: (any) => void
) => {
  // 코드 구현 
})
```


***


#### resolve와 rejct 함수

- 앞에서 설명한 비동기 방식 API readFile을 Promise로 구현

_readFilePromise.ts_

```typeScript
import { rejects } from 'assert';
import {readFile} from 'fs'
import { resolve } from 'path';

export const readFilePromise = (filename: string): Promise<string> =>
    {
    return new Promise<string>((
        resolve: (value: string) => void, 
        reject: (error: Error) => void) => {
            readFile(filename, (err: Error, buffer: Buffer) => {
                if(err) reject(err)
                else resolve(buffer.toString())
            })
        })
    }
```

- 다음 코드는 readFilePromise 함수가 반환하는 Promise 타입 객체의 then, catch, finally 메서드로 메서드 체인 형태로 사용

_readFilePromise-test.ts_

```typeScript
import {readFilePromise} from  './readFilePromise'

readFilePromise('./package.json')
    .then((content: string) => {
        console.log(content)        // package.json 파일을 읽은 내용
        return readFilePromise('./tsconfig.json')
    })
    .then((content: string) => {
        console.log(content)        // tsconfig.json 파일을 읽은 내용
        /* catch 쪽 콜백함수에 'EISDIR: illegal operation on a directory, read' 라는 오류 메시지 전달 */
        return readFilePromise('.')
    })
    .catch((err: Error) => console.log('error:', err.message))
    .finally(() => console.log(`프로그램 종료`))
```


***


#### Promise.resolve 메서드

- Promise 클래스는 resolve 라는 클래스 메서드(정적 메서드)를 제공하는데, Promise.resolve(값) 형태로 호출하면,  
  '값'은 then 메서드에서 얻을 수 있다.
  
_Promise.resolve-test.ts_

```typeScript
Promise.resolve(1)
    .then(value => console.log(value))  // 1

Promise.resolve('hello')    
    .then(value => console.log(value))  // hello

Promise.resolve([1, 2, 3])    
    .then(value => console.log(value))  // [ 1 2 3 ]

Promise.resolve({name: 'Jack', age: 32})
    .then(value => console.log(value))  // {name: 'Jack', age: 32 }   
```


***


#### Promise.reject 메서드

- Promise.reject(Erro 타입 객체)를 호출하면 이 'Error 타입 객체'는 항상 catch 메서드의 콜백 함수에서 얻을 수 있다.

_Promise.reject-test.ts_

```typeScript
Promise.reject(new Error('에러 발생')) 
    .catch((err: Error) => console.log(`error:`, err.message))  // error : 에러 발생
```


***


#### then-체인

- Promise 객체에 then 메서드를 여러 번 호출하는 코드 형태를 'then-체인(then-chain)' 이라고 한다.  
  then에서 반환된 값은 또 다른 then 메서드를 호출해 값을 수신할 수 있다.
  
_then-chain.ts_

```typeScript
Promise.resolve(1)
    .then((value: number) => {
        console.log(value)      // 1
        return Promise.resolve(true)
    })
    .then((value: boolean) => {
        console.log(value)      // true 
        return [1, 2, 3]
    })
    .then((value: number[]) => {
        console.log(value)      // [ 1, 2, 3 ]
        return {name: 'jack', age: 32}
    })
    .then((value: {name: string, age: number}) => {
        console.log(value)      // { name: 'jack', age: 32 }
    })
```


***


#### Promise.all 메서드

- Array 클래스는 every 라는 이름의 인스턴스 메서드를 제공하는데, 배열의 모든 아이템이 조건을 만족하면 true를 반환

_Array.every-test.ts_

```typeScript
const isAllTrue = (values: boolean[]) => values.every((value => value == true))

console.log(
    isAllTrue([true, true, true]), // true
    isAllTrue([false, true, true]), // false
)
```

- Promise 는 every처럼 동작하는 all 이라는 이름의 클래스 메서드를 제공

```typeScript
all(프로미스 객체 배열: Promise[]): Promise<해소된 값들의 배열(혹은 any)>
```

- Promise.all 메서드는 마찬 가지로 또 다른 Promise 객체를 반환하므로, 해소된 값들의 배열은  
  then 메서드를 호출해서 얻을 수 있다. 

- 만약, 배열에 담긴 Promise 객체 중 거절 객체가 발생하면 더 기다리지 않고 해당 거절 값을 담은  
  Promise.reject 객체를 반환하고, catch 메서드를 통해 얻는다.
  
_Promise-all-test.ts_

```typeScript
const getAllResolvedResult = <T>(promises: Promise<T>[]) => Promise.all(promises)

getAllResolvedResult<any>([Promise.resolve(true), Promise.resolve('hello')])
    .then(result => console.log(result))    // [ true, 'hello']

getAllResolvedResult<any>([Promise.reject(new Error('error')), Promise.resolve(1)])    
    .then(result => console.log(result))        // 호출되지 않는다.
    .catch(error => console.log('error:', error.messgae))  // error: error
```


***


#### Promise.race 메서드

- Array 클래스는 배열의 내용 중 하나라도 조건을 만족하면 true를 반환하는 some 이라는 인스턴스 메서드를 제공

_Array.some-test.ts_

```typeScript
const isAnyTrue = (values: boolean[]) => values.some((value => value == true))

console.log(
    isAnyTrue([false, true, false]),        // true
    isAnyTrue([false, false, false])        // false
)
```

- Promise.race 클래스 메서드는 배열에 담긴 프로미스 객체 중 하나라도 해소되면 이 값을 담은 Promise.resolve 객체를 반환  
  만일, 거절 값이 발생하면 Promise.reject객체를 반환한다.
  
```typeScript
race(프로미스 객체 배열: Promise[]): Promise<가장 먼저 해소된 객체의 값 타입(혹은 Error)>
```

- 다음의 코드 동작을 살펴볼 것

_Promise.race-test.ts_

```typeScript
Promise.race([Promise.resolve(true), Promise.resolve('hello')])
    .then(value => console.log(value))      // true

Promise.race([Promise.resolve(true), Promise.reject(new Error('hello'))])    
    .then(value => console.log(value))      // true
    .catch(error => console.log(error.message))     // 호출되지 않는다

Promise.race([Promise.reject(new Error('error')), Promise.resolve(true)])    
    .then(value => console.log(value))      // 호출되지 않는다
    .catch(error => console.log(error.message))     // error
```
