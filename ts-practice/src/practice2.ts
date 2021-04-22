type Person2 = {
    name: string; 
    age?: number; 
}

type Developer2 = Person & {
    skills: string[];
}

const person2: Person2 = {
    name: '김사람'
}

const expert2: Developer2 = {
    name: '김개발',
    skills: ['javsascript', 'react']
}

type People = Person2[];

type Color = 'red' | 'orange' | 'yellow';
const color: Color = 'red';
const colors: Color[] = ['red', 'orange'];

//=========================

// function merge(a: any, b: any): any {
//     return {
//         ...a,
//         ...b,
//     };
// }

// const merged = merge( { foo: 1 }, { bar:1 });


function merge<A, B>(a: A, b: B): A & B {
    return {
        ...a,
        ...b
    };
}

const merged = merge({ foo: 1 }, { bar: 1 });

function wrap<T>(param: T) {
    return {
        param
    }
}

const wrapped = wrap(10);

//====================================

// interface Items<T> {
//     list: T[];
// }

// const items: Items<string> = {
//     list: ['a', 'b', 'c']
// };

type Items<T> = {
    list: T[];
}

const items: Items<string> = {
    list: ['a', 'b', 'c']
}
