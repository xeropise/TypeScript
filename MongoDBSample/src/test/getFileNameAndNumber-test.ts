import {getFileNameAndNumber} from '../utils/getFileNameAndNumber'

const [filename, numberofFakeItems] = getFileNameAndNumber('data/fake.csv', 100000)
console.log(filename, numberofFakeItems)