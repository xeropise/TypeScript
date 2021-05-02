# About-TypeScript
<p align="center">
 <img src="https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg" width="300" height="300" >
 <img src="http://image.yes24.com/goods/89328106/200x0">
</p>


## 01-1 타입스크립트란 무엇인가?
***
 1. 세 종류의 자바스크립트 
    - 웹 브라우저에서 동작하는 표준 자바스크립트 ES5 (ECMAScript 5) 
    
    - 2015년부터 매년 새로운 버전을 발표하는 ESNext ( ES6 이후 버전을 통틀어 ESNext )
    
    - ESNext + 타입(type) 기능을 추가한 타입스크립트(TypeScript)
    
  
 2. 타입스크립트는 누가 만들었는가?
    - 마이크로소프트가 개발하고 유지하고 있는 오픈소스 프로그래밍 언어 2012년 말 처음 발표
    
    - C# 언어를 창시한 아네르스 하일스베르(Anders Hejlsberg)가 핵심 개발자 
    
  
 3. 자바스크립트에 타입 기능이 있으면 좋은 이유
 
    * A 라는 개발자가 다음과 같은 코드를 만든다
    ```javascript 
    function makePerson(name,age) {}
    ```
  
    * B라는 개발자가 이 코드를 이용하려고 다음 코드를 만들어 실행하면 오류가 발생했다면, 오류의 원인이 찾기 어렵다
    ```javascript
    makePerson(32,"Jack")
    ```
  
    * 타입스크립트의 타입 기능을 이용해 구현하면 문제가 발생하지 않음
    ```javascript
    function makePerson(name: string, age:number) {}
    ```
  
    * 그리고 타입스크립트 컴파일러는 문제의 원인이 어디에 있는지 친절하게 알려준다.
  
    * 트랜스파일 ( 어떤 프로그래밍 언어로 작성된 소스코드를 또 다른 프로그래밍 언어로 된 소스코드로 바꿔주는 프로그램 )
    
      - ESNext 자바스크립트 소스코드 -> 바벨(Babel) -> ES5 자바스크립트 코드로 변환
     
      - 타입스크립트 소스코드 -> TSC(TypeScript compiler -> ES5 자바스크립트 코드로 변환
     
***

## 01-2 타입스크립트 주요 문법 살펴보기

***

 **ESNext의 주요 문법**
 
 (1) 비구조화 할당(destructuring assignment)
 
 ```javascript
 let person = {name: "Jane", age: 22}
 let [name, age} = person      // name = "jane", age = 22
 
 let array = [1,2,3,4]
 let [head, ...rest] = array   // head = 1, resut = [2,3,4]
 
 let a = 1, b = 2
 [a, b] = [b, a]  // a = 2, b = 1
 ```
 
 (2) 화살표 함수(Arrow function)
 
 ```javascript
 function add(a, b) {return a + b}
 const add2 = (a, b) => a + b
 ```
 
 (3) 클래스
 
 ```javascript
 abstract class Animal {
    constructor(public name?: string, public age?: number) { }
    abstract say(): string
 }
 class Cat extends Animal {
    say() {return '야옹'}
 }
 class Dog extends Animal {
    say() {return '멍멍'}
 }
 
 let animals: Animal[] = [new Cat('야옹이', 2), new Dog('멍멍이', 3) ]
 let sounds  = animal.map(a => a.say())  //["야옹", "멍멍"]
 ```

(4) 모듈
```javascript
import * as fs from 'fs'
export function writeFile(filepath: string, content: any) { }
```

(5) 생성기
```javascript
function* get() {
  yield* [1,2]
}
for(let value of gen()) { console.log(value) } // 1, 2
```

* 01행 function*을 생성기라고 한다.  

* 01행 덕분에 02행 yield라는 키워드를 사용가능 

* 코드에서 yield가 호출되면 프로그램 실행이 02행에서 일시 정지한 후, 점프해서 04행을 실행  

* 그리고 04행 실행을 마치면 다시 02행을 실행하고, 이 과정을 배열 [1,2]의 요소를 모두 순회할 때까지 반복   

(6) Promise || async/await
```javascript
async function get() {
  let values = []
  values.push(await Promise.resolve(1))
  values.push(await Promise.resolve(2))
  values.push(await Promise.resolve(3))
  return values
}
get().then(values => console.log(values))  // [1, 2, 3]
```

***
***


 **타입스크립트 고유 문법**  
 
 (1) 타입 주석과 타입 추론
 ```javascript
 let n: number = 1
 let m = 2
 ```
 * 01행 변수 n뒤에는 콜론(:)과 타입 이름이 있는데, 이것을 '타입 주석(type annotation)'이라고 한다.  
 
 * 02행처럼 타입부분을 생략가능, 타입부누이 생략되면 대입 연산자(=)의 오른쪽 값을 분석해 왼쪽 변수의 타입을 결정, 이를 '타입 추론(type inference)'라고 한다. 
 
 * 타입 추론 기능은 자바스크립트 소스코드와 호환성을 보장하는 데 큰 역할을 한다, 타입 추론 덕분에 ' .js'파일을 확장자만 '.ts'로 바꾸면, 타입스크립트 환경에서 바로 동작
 
 (2) 인터페이스
 ```javascript
 interface Person {
   name: string
   age?: number
 }
 
 let person: Person = { name : "Jane" }
 ```
 
 (3) 튜플  
 * 물리적으로는 배열과 같으나, 배열에 저장되는 아이템의 데이터 타입이 모두 같으면 배열, 다르면 튜플
 ```javascript
 let numberArray: number[ ] = [1, 2, 3]  //배열
 let tuple: [boolean, number, string] = [true, 1, 'Ok']  //튜플
 ```
 
 (4) 제네릭 타입  
 * 제네릭 타입은 다양한 타입을 한꺼번에 취급할 수 있게 해준다.
 ```javascript
 class Container<T> {
   constructor(public value: T){ }
 }
 let numberContainer : Container<number> = new Container<number>(1)
 let stringContainer : Container<string> = new Container<string>('Hello world')
 ```
 
 (5) 대수 타입(algebraic data type)
 * ADT란, 추상 데이터 타입(abstract data type)을 의미하기도 하지만, 대수 타입이라는 의미로도 사용됨  
 
 * 대수 타입이란, 다른 자료형의 값을 가지는 자료형을 의미  
 
 * 합집합 타입(union 또는 sum type  '|' ), 교집합 타입(intersection 또는 product type '&') 두 가지가 있음
 ```javascript
 type NumberOrString = number |string  //합집합 타입 예
 type AnimalAndPerson = Animal &Person  // 교집합 타입 예
 ```

***
## 01-3 타입스크립트 개발 환경 만들기  
***

### 책에서는 scoop 프로그램 설치를 권장  
 (자세한 소개는 https://www.lesstif.com/software-architect/scoop-admin-windows-51282748.html 참조)

![1](https://user-images.githubusercontent.com/50399804/103540652-668a2300-4edd-11eb-9239-8572220e90e3.JPG)  

  1) 첫번째 명령은 세번째 명령이 정상적으로 동작하도록 윈도우 실행 규칙을 변경  
  2) 실행 정책 변경을 묻는 질문에 'A'를 입력  
  3) 두번째 명령은 앞으로 scoop을 이용해 설치하는 모든 프로그램의 경로를 'C:\Scoop'으로 설정  
  4) 세번째 명령은 scoop을 설치  
  5) 네번째 명령은 aria2를 설치 ( aria2를 설치해 놓으면 scoop이 다중 내려받기를 할 수 있어서 프로그램 설치 시간이 절감됨 )   
  6) 마지막 명령은 git을 설치  
  
  * 설치한 디렉터리의 특정 디렉터리를 지우면 프로그램이 제거되며 관리자 모드 파워셀에서 scoop update * 명령을 실행하면  
    지금까지 설치한 모든 프로그램을 대상으로 한꺼번에 최신 버전으로 버전 업 가능  
    
    ![2](https://user-images.githubusercontent.com/50399804/103541153-50309700-4ede-11eb-8c2c-08351a65a8c2.JPG)
    
    **윈도우 환경 변수 설정**

***

### 비쥬얼 스튜디오 코드 설치

 > scoop bucket add extras  
 > scoop install vscode  
 
 * 첫번째 명령은 두번째 명령에 필요한 scoop 부가 정보(extras)를 설치  
 
 * 두번째 명령은 VSCode를 설치
 
 * C:\Scoop\apps\vscode\current\vscode-install-context.reg를 실행하여, 마우스 오른쪽 단축 메뉴에 등록  
  > 알고보니 자동 등록됩니다. 굳이 안하셔도 됩니다
  
 * 색상 테마 설정  
 ![3](https://user-images.githubusercontent.com/50399804/103542864-f7163280-4ee0-11eb-98af-12c5e7d5bfe1.png)  
 ![4](https://user-images.githubusercontent.com/50399804/103542873-f9788c80-4ee0-11eb-9e55-53a8257bad0d.png)  
 
 * 한국어 언어 팩 설치
 ![5](https://user-images.githubusercontent.com/50399804/103543308-a226ec00-4ee1-11eb-8e57-8abe00707fdd.png)  
 ![6](https://user-images.githubusercontent.com/50399804/103543311-a4894600-4ee1-11eb-8b49-c08bd284d40d.png)
 
 
***

### 노드제이에스 (Node Js), 구글 크롬브라우저, 타입스크립트 컴파일러 설치

![7](https://user-images.githubusercontent.com/50399804/103549255-68a6ae80-4eea-11eb-9f31-aec247b32a88.JPG)
 
 * 노드제이에스 안정 버전(long term support, LTS)을 설치
 
 * node -v 로 version확인
 
 * 크롬브라우저는 구글에 저작권이 있어, 이책에서는 오픈소스 버전의 크롬 브라우저인 크로미움(Chromium) 설치
 
 * 타입스크립트 패키지 설치, 타입스크립트는 노드제이에스 환경에서만 동작, npm을 사용해서 설치, i는 install,   
   -g는 global 전역의미
   
 * 타입스크립트 패키지는 서버와 클라이언트로 동작하는 두 개의 프로그램을 포함하고 있음  
   따라서, 타입스크립트 컴파일러 이름은 패키지 이름과 달리 'tsc' 
   타입스크립트 컴파일러와 클라이언트라는 의미가 동시에 있다.
   
 * tsc -v 로 버전 확인
 
### 작업 할 디렉토리 생성

![캡처](https://user-images.githubusercontent.com/50399804/103734940-520a6f80-5030-11eb-88f0-9991b5b335b4.PNG)

* VSCode에서 터미널 단축키는 Ctrl + ` 이다.  

### touch 프로그램 설치, 타입스크립트 컴파일과 실행
   
 > VSCode에서 명령어를 찾을 수 없다고 뜬다 재시작을 해볼 것, 그래도 난다면 구글신에게 물어보자.
 
 * 파일 생성 시 지정한 이름의 파일이 이미 있으면 무시, 없으면 생성
 
 ```javascript
 > scoop install touch
 ```
 
 ![8](https://user-images.githubusercontent.com/50399804/103549986-93ddcd80-4eeb-11eb-98f7-6df41e7db3b3.JPG)
 
 
### ts-node 설치

![9](https://user-images.githubusercontent.com/50399804/103550234-f2a34700-4eeb-11eb-94fa-82e5f5b6c2de.JPG)

 * tsc는 타입스크립트 코트를 ES5 형식의 자바스크립트 코드로 변환만 할 뿐 실행하지는 않는다.  
   만약, 타입스크립트 코드를 ES5로 변환하고 실행까지 동시에 하려면 ts-node라는 프로그램을 설치해야 한다.
   
 * 설치 후, VSCode 터미널에서 다음 명령으로 컴파일과 실행을 동시에 진행 
  ```javascript
  > ts-node hello.ts
  ```
  
  
  # 01 Complete 
  
