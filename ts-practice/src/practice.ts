
// let count = 0;
// count += 1;

// const message: string = 'hello world';

// const done: boolean = true; 

// const numbers: number[] = [1, 2, 3];
// const messages: string[] = ['hello', 'world'];

// //messages.push(1); // 숫자를 넣으려고하면 오류

// let mightBeUndefined: string | undefined = undefined
// let nullableNumber: number | null = null; 

// let color: 'red' | 'orange' | 'yellow' = 'red'; 
// color = 'yellow';
// //color = 'green'; // 에러 발생!

//===========================

function sum(x: number, y: number): number {
    return x + y; 
}

sum(1,2);

function sumArray(numbers: number[]): number {
    return numbers.reduce((acc, current) => acc + current, 0);
}

function returnNothing() : void {
    console.log('I am just sayning hello world');
}

interface Shape {
    getArea(): number; // Shape interface 에는 getArea 라는 함수가 꼭 있어야 하며, 반환값은 숫자여야 한다.
}

class Circle implements Shape {
    
    // radius: number;

    // constructor(radius: number) {
    //     this.radius = radius;
    // }

    constructor(public radius: number) {
        this.radius = radius;
    }

    getArea() {
        return this.radius * this.radius * Math.PI;
    }
}

class Rectangle implements Shape {
    // width: number;
    // height: number;
    // constructor(width: number, height: number) {
    //     this.width = width; 
    //     this.height =height; 
    // }

    constructor(private width: number, private height: number) {
        this.width = width;
        this.height = height;
    }

    getArea() {
        return this.width * this.height;
    }
}

const shapes: Shape[] = [new Circle(5), new Rectangle(10,5)];

shapes.forEach(shape => {
    console.log(shape.getArea()); 
});

//========================================================

// interface Person {
//     name: string;
//     age?: number;
// }

interface Developer {
    name: string;
    age?: number;
    skills: string[];
}

// const person: Person = {
//     name: '김사람',
//     age: 20 
// }

// const expert : Developer = {
//     name: '김개발',
//     skills: ['javascript', 'react']
// }

interface Person {
    name: string;
    age?: number; 
}

interface Developer extends Person {
    skills: string[];
}

const person: Person = {
    name: '김사람',
    age: 20 
}

const expert : Developer = {
    name: '김개발',
    skills: ['javascript', 'react']
}

const people: Person[] = [person, expert];

//=====================
