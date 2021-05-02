export type Person = {name: string, age: number}

const printPerson = ({name, age}: Person): void => 
    console.log(`name: ${name}, age: ${age}`);

printPerson({name: "Jack", age: 10})    


const makeObject = (key, value) => ({[key]: value});
console.log(makeObject('name', 'Jack')) // { name: 'Jack' }
console.log(makeObject('firstName', 'Jane')) // { firstName: 'Jane' }
