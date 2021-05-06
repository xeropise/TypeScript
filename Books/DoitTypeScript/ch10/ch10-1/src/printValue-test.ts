import { printValue, Valuable } from './printValue'

printValue(new Valuable<number>(1))
printValue(new Valuable<boolean>(true))
printValue(new Valuable<string>('hello'))
printValue(new Valuable<number[]>([1, 2, 3]))