* tsc --help를 실행하면 다음과 같은 내용을 알 수 다.

![16](https://user-images.githubusercontent.com/50399804/103620988-d6e58280-4f77-11eb-8a01-30c32e59a298.JPG)

* 앞에서 만든 tsconfig.json 파일을 보면 다음처럼 구성되어 있다.
```
{
  "compilerOptions" { ...생략... }
  "include" : ["src/**/*"]
}
```

 - compilerOptions 항목은 tsc 명령 형식에서 옵션을 나타내고, include 항목은 대상 파일 목록을 나타낸다.  
 - include 항목에서 src/**/*는 src 디렉터리는 물론 src 하위 디렉터리에 있는 모든 파일을 컴파일 대상으로 한다는 뜻  
 
> tsconfig.json
```
{
 "compilerOptions": {
    "module": "commonjs",
    "esModuleInterop" : true,
    "target": "es5",
    "moduleResolution": "node",
    "outDir": "dist",
    "baseUrl": ".",
    "sourceMap": true,
    "downlevelIteration": true,
    "noImplicitAny": false,
    "paths": { "*": ["node_modules/*"] }
 },
 "include": ["src/**/*"]
}
```

#### module
> 타입스크립트 소스코드가 컴파일되어 만들어진 ES5 자바스크립트 코드는 웹 브라우저와 노드제이에스 양쪽에서 모두동작해야 한다  
  그런데 웹 브라우저와 노드제이에스는 물리적으로 동작하는 방식이 달라서 여러 개의 파일로 분할된 자바스크립트 코드 또는 또한  
  웹 브라우저와 노드제이으에스 양쪽에서 각각 다르게 동작한다.  
  
  > 자바스크립트 모듈은 웹 브라우저에서는 AMD(asynchronous moduel definition) 방식으로 동작하고,  
    노드제이에스처럼 웹 브라우저가 아닌 환경에서는 CommonJS 방식으로 동작한다.
  
  > tsconfig.ts 파일에서 compilerOptions 항목의 module 키는 동작 대상 플랫폼이 웹 브라우저인지 노드제이엔스인지를 구분해  
    그에 맞는 모듈 방식으로 컴파일하려는 목적으로 설정, 플랫폼에 따라 다음과 같이 설정 가능
  
  플랫폼 | 키값
  ------|-------
  웹 브라우저 | amd
  노드제이에스 | commonjs
  
  
#### moduleResolution
> module 키의 값이 commonjs이면 노드제이에스에서 동작하는 것을 의미, 항상 node로 설정  
  반면에 module 키값이 amd이면 classic으로 설정
  
  
#### target
> 트랜스파일할 대상 자바스크립트의 버전을 설정, 대부분 es5, 노드제이에스 최신이면 es6


#### baseUrl, OutDir
> baseUrl과 outDir에는 트랜스파일된 es5 자바스크립트 파일을 저장하는 디렉터리를 설정  
  tsc는 tsconfig.json 파일이 있는 디렉터리에서 실행  
  따라서 현재 디렉터리를 의미하는 "." 로 baseUrl 키 값을 설정하는 것이 보통  
  outDir 키는 baseDir 설정값을 기준으로 했을 때 하위 디렉터리의 이름, 그림에서는 dist라는 값을 설정했으므로  
  빌드된 결과가 dist 디렉터리에 만들어진다.
  
#### paths
> paths에는 소스 파일의 import 문에서 from 부분을 해석할 때 찾아야 하는 디렉터리를 설정  
  import 문이 찾아야 하는 소스가 외부 패키지이면 node_modules 디렉터리에서 찾아야 하므로 키 값에  
  node_modules/*도 포함했음
  
#### esModuleInterop
> 오픈소스 자바스크립트 라이브러리 중에는 웹 브라우저에서 동작한다는 가정으로 만들어진 것이 있는데,  
  이들은 CommonJS 방식으로 동작하는 타입스크립트 코드에 혼란을 줄 수 있어, true로 설정  
  chance가 AMD방식을 전제로 해서 구현된 라이브러리 이다.
  
#### sourceMap
> true로 설정하는 경우, 트랜스파일 디렉터리에는 .js 말고도 .js.map이 만들어지는데, 이 소스맵 파일은  
  변환된 자바스크립트 코드가 타입스크립트 코드의 어디에 해당하는지 알려준다, 주로 디버깅할 때 사용
  
#### downlevlelIteration
> 생성기(generator)가 정상적으로 동작하려면 true로 설정 (06장에 설명)

#### noImplicitAnyt
> 타입스크립트 컴파일러는 기본적으로 f(a,b) 처럼 매개변수 a,b에 타입을 명시하지 않은 코드일 경우  
  f(a: any, b: any)처럼 암시적으로 any 타입을 설정한 것으로 간주하는데, 이런 형태의 코드는  
  타입스크립트 언어의 장점을 사용하는 것이 아니므로, 코드에 문제가 있음을 알린다.  
  
> 근데 오류가 발생하는 것이 타입스크립트를 처음 배우는 사람을 매우 혼란스럽게 하므로 false로 설정하여  
  타입을 지정하지 않더라도 문제로 인식하지 않게 했다.

  
  
