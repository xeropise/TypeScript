import { IValuable, printValueT } from './printValueT'
import { Valuable } from './Valuable'

printValueT(new Valuable(1))
printValueT({value: true})