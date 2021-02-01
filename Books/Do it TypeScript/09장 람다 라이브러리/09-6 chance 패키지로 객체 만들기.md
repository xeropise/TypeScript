## 09-6 chance 패키지로 객체 만들기

- 중첩 객체를 만들어 보자.

***

__ICoordinates 타입 객체 만들기__

    mkdir -p src/model/coordinates
    touch src/model/coordinates/ICoordinates.ts
    touch src/model/coordinates/makeICoordinates.ts
    touch src/model/coordinates/makeRandomICoordinates.ts
    touch src/model/coordinates/index.ts
    
_src/model/coordinates/ICoordinates.ts_

```typeScript
export type ICoordinates = {
    latitude: number
    longitude: number
}
```

_src/model/coordinates/makeICoordinates.ts_

```typeScript
import {ICoordinates} from './ICoordinates'

export const makeICoordinates = (latitude: number, longitude: number) : 
    ICoordinates => ({latitude, longitude})
```

_src/model/coordinates/makeRandomICoordinates.ts_

```typeScript
import {ICoordinates} from './ICoordinates'
import {makeICoordinates} from './makeICoordinates'
import Chance from 'chance'
const c = new Chance

export const makeRandomICooridnates = (): ICoordinates => 
    makeICoordinates(c.latitude(), c.longitude())
```

_src/model/coordinates/index.ts_

```typeScript
import {ICoordinates} from './ICoordinates'
import {makeICoordinates} from './makeICoordinates'
import {makeRandomICooridnates} from './makeRandomICoordinates'

// ICoordinates와 makeICoordinates, makeRandomICoordinates를 re-export한다
export {ICoordinates, makeICoordinates, makeRandomICooridnates}
```

_src/coordinates-test.ts_

```typeScript
import {ICoordinates, makeRandomICooridnates} from './model/coordinates'

const coordinates: ICoordinates = makeRandomICooridnates()
console.log(coordinates)
```
> 해당 디렉토리에 index.ts 파일이 있으면, 타입스크립트 컴파일러가 뒤를 생략해도 알아서 해석한다.


***


__ILocation 타입 객체 만들기__

    mkdir -p src/model/location
    touch src/model/location/ILocation.ts
    touch src/model/location/makeILocation.ts
    touch src/model/location/makeRandomILocation.ts
    touch src/model/location/index.ts
    

_src/model/location/ILocation.ts_

```typeScript
import {ICoordinates} from '../coordinates'

export type ILocation  = {
    country: string
    city?: string
    address?: string
    coordinates?: ICoordinates
}
```

_src/model/location/makeILocation.ts_

```typeScript
import {ILocation} from './ILocation'
import {ICoordinates, makeICoordinates} from '../coordinates'

export const makeILocation = (
    country: string,
    city: string,
    address: string,
    coordinates: ICoordinates
): ILocation => ({country, city, address, coordinates})
```

_src/model/location/makeRandomILocation.ts_

```typeScript
import {ILocation} from './ILocation'
import {makeILocation} from './makeILocation'
import {makeRandomICooridnates} from '../coordinates'
import Chance from 'chance'
const c = new Chance

export const makeRandomILocation = (): ILocation =>
        makeILocation(c.country(), c.city(), c.address(), makeRandomICooridnates())
```

_src/model/location/index.ts_

```typeScript
import {ILocation} from './ILocation'
import {makeILocation} from './makeILocation'
import {makeRandomILocation} from './makeRandomILocation'

export {ILocation, makeILocation, makeRandomILocation}
```

_src/location-test.ts_

```typeScript
import {makeRandomILocation, ILocation} from './model/location'

const location: ILocation = makeRandomILocation()
console.log(location)
```


***


__IPerson 타입 객체 만들기__

    mkdir -p src/model/person
    touch src/model/person/IPerson.ts
    touch src/model/person/makeIPerson.ts
    touch src/model/person/makeRandomIPerson.ts
    touch src/model/person/index.ts
    
_src/model/person/IPerson.ts_

```typeScript
import {ILocation} from '../location'

export type IPerson = {
    name: string
    age: number
    title?: string
    location?: ILocation
}

export {ILocation}
```

_src/model/person/makeIPerson.ts_

```typeScript
import {IPerson, ILocation} from './IPerson'

export const makeIPerson = (
    name: string,
    age: number,
    title?: string,
    location?: ILocation
) => ({name, age, title, location})

export {IPerson, ILocation}
```

_src/model/person/makeRandomIPerson.ts_ 

```typeScript
import {IPerson, makeIPerson} from './makeIPerson'
import {makeRandomILocation} from '../location'
import Chance from 'chance'

const c = new Chance

export const makeRandomIPerson = () : IPerson =>
    makeIPerson(c.name(), c.age(), c.profession(), makeRandomILocation())
```

_src/model/person/index.ts_

```typeScript
import {IPerson, makeIPerson} from './makeIPerson'
import {makeRandomIPerson} from './makeRandomIPerson'

export {IPerson, makeIPerson, makeRandomIPerson}
```

_src/person-test.ts_

```typeScript
import {IPerson, makeRandomIPerson} from './model/person'

const person: IPerson = makeRandomIPerson()
console.log(person)
```
