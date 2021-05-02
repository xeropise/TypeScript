## 10-6 nullable 타입과 프로그램 안전성

      npm init --y
      npm i -D typescript ts-node @types/node
      mkdir -p src/option
      mkdir src/test
      tsc- --init
      
***

__nullable 타입이란?__

- 자바스크립트와 타입스크립트는 변수가 초기화되지 않으면 undefined 라는 기본 값을 기본으로 지정  
  그런데 자바스크립트와 타입스크립트는 undefined가 사실상 같은 의미인 null 이 있다. 
  
- 타입스크립트에서 undefined의 값의 타입은 undefined, null 값의 타입은 null, 이 둘은 사실상  
  같은 것이므로 서로 호환
  
- undefined 타입 변수에는 null 을 할당, null 타입 변수에는 undefined 값을 지정할 수 있다.  
  하지만 두 값이외에 값은 할당 불가능
  
- undefined와 null 타입을 nullable 타입이라고 하며, 코드로는 다음처럼 표현 가능

_src/option/nullable.ts_

```typeScript
export type nullable = undefined | null
export const nullable: nullable = undefined
```

- 그런데 이 nullable 타입들은 프로그램이 동작할 때 프로그램을 비정상적으로 종료시키는 주요 원인  
  이를 방지하기 위해 연산자나 클래스를 제공하는데 이를 알아보자.
  
***

__옵션 체이닝 연산자__

- 변수가 선언만 되었을 뿐 어떤 값으로 초기화 되지 않으면, 다음 화면처럼 코드를 작성할 때는 문제가 없지만,  
  실제로 실행하면(즉, 런타임) 오류가 발생하면서 프로그램이 비정상적으로 종료
  
- '옵션 체이닝 연산자' 혹은 '널 병합 연산자'를 제공하여 이러한 오류를 방지

- 자바스크립트는 최근에 물음표 기호와 점 기호를 연이어 쓰는 ?. 연산자를 표준으로 채택했으며, 타입스크립트는  
  버전 3.7.2부터 이 연산자를 지원
  
_src/optional-chainging-operator.ts_

```typeScript
export interface IPerson {
    name: string
    age?: number
}
let person: IPerson
// console.log(person.name)         // 런타임 오류 발생 
console.log(person?.name)           /* 런타임 오류 없이 정상적으로 실행되며, undefined 값이 반환 */
```

- 옵션 체이닝 연산자는 '세이브 내비게이션 연산자' 라고 한다.

_src/safe-navigation.ts_

```typeScript
export type ICoordinates = {longitude: number}
export type ILocation = {country: string, coords?: ICoordinates}
export type IPerson = {name: string, location?: ILocation}

let person: IPerson = {name: 'Jack'}
let longitude = person?.location?.coords?.longitude // safe navigation
console.log(longitude)      // undefined
if(person && person.location && person.location.coords) {
    longitude = person.location.coords.longitude
}
```

***

__널 병합 연산자__

- 자바스크립트는 옵션 체이닝 연산자를 표준으로 채택하면서, 이와 동시에 물음표 기호 ?? 로  
  널 병합 연산자도 표준으로 채택했고, 타입스크립트도 역시 3.7.2 버전부터 지원하기 시작
  
- 옵션 체이닝 연산자 부분이 undefined 가 되면 널 병합 연산자가 동작해 undefined 대신 0을 반환

_src/nullish-coalescing-operator.ts_

```typeScript
export type ICoordinates = {longitude: number}
export type ILocation = {country: string, coords?: ICoordinates}
export type IPerson = {name: string, location?: ILocation}

let person: IPerson

// 널 병합 연산자를 사용해 기본값 0을 설정
let longitude = person?.location?.coords?.longitude ?? 0
console.log(longitude)
```

***

_nullable 타입의 함수형 방식 구현_

- 타입스크립트에서 Optional 과 같은 타입을 제공


_src/option/Option.ts_

```typeScript
import {Some} from './Some'
import {None} from './None'

export class Option {
    private constructor() {}
    static Some<T>(value: T) {return new Some<T>(value)}
    static None = new None()
}

export {Some, None}
```
> Option 클래스는 생성자가 private므로 Option.Some 혹은 Option.None 형태로만 생성 가능

- 함수형 언어들은 보통 어떤 정상적인 값을 가지면 ( Number, String, Object, Array ), Some 타입에 저장  

- undefined나 null과 같은 비정상적인 값은 모두 None 타입으로 처리하는 경향이 있음

- Some 과 None은 둘 다 IValuable<T>, IFunctor<T> 라는 인터페이스를 구현하고 있다.

_src/option/IValuable.ts_

```typeScript
export interface IValuable<T> {
    getOrElse(defaultValue: T)
}
```
> getOrElse라는 이름의 메서드를 선언하고 있다.

- 함수형 프로그래밍 언어에서는 map이라는 메서드가 있는 타입들을 '펑터(functor)'라고 부른다.

_src/option/IFunctor.ts_

```typeScript
export interface IFunctor<T> {
    map<U>(fn: (value: T) => U)
}
```

***

(1) Some 클래스 구현

- getOrElse와 map 메서드가 정상으로 구현되어 있다. value 속성은 private 이므로, Some 클래스 사용자는  
  항상 getOrElse 메서드를 통해 Some 클래스를 얻어야 하고, value 값을 변경하려면 map 메서드를 사용해야 한다.
  
_src/option/Some.ts_

```typeScript
import {IValuable} from './IValuable'
import {IFunctor} from './IFunctor'

export class Some<T> implements IValuable<T>, IFunctor<T> {
    constructor(private value: T) {}
    getOrElse(defaultValue: T) {
        return this.value ?? defaultValue
    }
    map<U>(fn: (T) => U) {
        return new Some<U>(fn(this.value))
    }
}
```

***

(2) None 클래스 구현

- Some과 다르게 None의 map 메서드는 콜백 함수를 전혀 사용하지 않는다. None 클래스는 nullable 타입의  
  값을 의미하므로, nullable값들이 map의 콜백 함수에 동작하면 프로그램이 비정상으로 종료될 수 있다.
  
_src/option/None.ts_

```typeScript
import {nullable} from './nullable'
import {IValuable} from './IValuable'
import {IFunctor} from './IFunctor'

export class None implements IValuable<nullable>, IFunctor<nullable> {
    getOrElse<T>(defaultValue: T | nullable) {
        return defaultValue
    }
    map<U>(fn: (T) => U) {
        return new None
    }
}
```

***

(3) Some 과 None 클래스 사용

_src/test/Option-test.ts_

```typeScript
import {Option} from '../option/Option'

let m = Option.Some(1)
let value = m.map(value => value + 1).getOrElse(1)
console.log(value)      // 2

let n = Option.None
value = n.map(value => value + 1).getOrElse(0)
console.log(value)      // 0
```
> None 타입 메서드는 콜백 함수를 실행하지 않고, 단순히 None 타입 객체만 반환하므로  
  getOrElse(0) 메서드가 전달받은 0을 저장한다.
  
***

__Option 타입과 예외 처리__

- Option 타입은 부수 효과가 있는 불순(impure) 함수를 순수(pure) 함수로 만드는데 효과적  
  자바스크립트의 parseInt 함수는 문자열을 수로 만들어주는데, 문제는 문자열이 "1" 이 아니라  
  'hello' 와 같으면 NaN(Not a Number) 이라는 값을 만든다.  
  (어떤 값이 Nan 인지 여부는 isNaN 함수로 알 수 있다.)
  
_src/option/parseNumber.ts_

```typeScript
import {parseNumber} from '../option/parseNumber'

let value = parseNumber('1')
                .map(value => value + 1)        // 2
                .map(value => value * 2)        // 4
                .getOrElse(0)
console.log(value)      // 4

value = parseNumber('hello world')
            .map(value => value + 1) // 콜백 함수가 호출되지 않는다. 
            .map(value => value * 2) // 콜백 함수가 호출도지 않는다.
            .getOrElse(0) // 0
console.log(value)  // 0             
```

- 자바스크립트의 JSON.parse 함수는 매개변수가 정상적인 JSON 포맷 문자열이 아니면 예외를 발생  
 예외를 발생시키는 함수는 부수 효과가 있는 불순 함수이지만, 다음 parseJson 함수는 try/catch  
 구문과 Option을 활용해 순수 함수가 됐다.
 
_src/option/parseJson.ts_

```typeScript
import {Option} from './Option'
import {IValuable} from './IValuable'
import {IFunctor} from './IFunctor'

export const parseJson = <T>(json: string): IValuable<T> & IFunctor<T> => {
    try {
        const value = JSON.parse(json)
        return Option.Some<T>(value)
    } catch(e) {
        return Option.None
    }
}
```

_src/test/parseJson-test.ts_

```typeScript
import {parseJson} from '../option/parseJson'

const json = JSON.stringify({name: 'Jack', age: 32})
let value = parseJson(json).getOrElse({})
console.log(value)      // { name: 'Jack', age: 32 }

value = parseJson('hello world').getOrElse({})
console.log(value)      // {}
```

