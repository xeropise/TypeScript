import { range } from '../../ch05-1/src/range'
import {fold} from './fold'

// let numbers: number[] = range(1, 100 + 1)
// console.log(numbers)

let numbers: number[] = range(1, 100 + 1)

let result = fold(numbers, (result,value) => result + value, 0 );
console.log(result);