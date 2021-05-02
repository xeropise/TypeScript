#### filter 메서드

- filter 메서드는 타입과 같은 형태로 설계됨

```typeScript
filter(callback: (value: T, index?: number): boolean ): T[]
```



***


#### map 메서드

- map 메서드는 다음과 같은 형태로 설계됨

 ```typeScript
 map(callback: (value: T, index?: number): Q): Q[]
 ```
 
- filter 와 달리 map 메서드는 입력 타입과 다른 타입의 배열을 만들 수 있다.

```typeScript
import {range} from './range'

let squares: number[] = range(1, 5 + 1)
                             .map((val:numbeR) => val * val )
console.log(squares)                             
```


***


#### reduce 메서드

- reduce 메서드는 다음과 같은 형태로 설계됨

```typeScript
reduce(callback: (result: T, value: T), initialValue: T): T
```

- 2번째 매개변수로, 초깃값을 전달하여 이를 사용할 수 있다.

```typeScript
import {range} from './range'

let reduceSum: numbe = range(1, 100 + 1)
          .reduce((result: number, value: number) => result + value, 0)
console.log(reduceSum)          
```
