import { pureDelete } from './pureDelete'

const mixedArray: Object[] = [
    [], {name: 'jack'}, {name: 'Jane', age: 32}, ['description']
]

const objectsOnly : Object[] = pureDelete(mixedArray, (val) => Array.isArray(val))
console.log(mixedArray, objectsOnly)
