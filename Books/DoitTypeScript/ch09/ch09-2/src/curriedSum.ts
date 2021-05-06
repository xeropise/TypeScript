import * as R from 'ramda'
import { sum } from './sum'

export const curriedSum = R.curryN(4, sum) // curriedSum(1)(2)(3)(4)