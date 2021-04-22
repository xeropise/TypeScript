"use strict";
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
function sum(x, y) {
    return x + y;
}
sum(1, 2);
function sumArray(numbers) {
    return numbers.reduce(function (acc, current) { return acc + current; }, 0);
}
function returnNothing() {
    console.log('I am just sayning hello world');
}
var Circle = /** @class */ (function () {
    // radius: number;
    // constructor(radius: number) {
    //     this.radius = radius;
    // }
    function Circle(radius) {
        this.radius = radius;
        this.radius = radius;
    }
    Circle.prototype.getArea = function () {
        return this.radius * this.radius * Math.PI;
    };
    return Circle;
}());
var Rectangle = /** @class */ (function () {
    // width: number;
    // height: number;
    // constructor(width: number, height: number) {
    //     this.width = width; 
    //     this.height =height; 
    // }
    function Rectangle(width, height) {
        this.width = width;
        this.height = height;
        this.width = width;
        this.height = height;
    }
    Rectangle.prototype.getArea = function () {
        return this.width * this.height;
    };
    return Rectangle;
}());
var shapes = [new Circle(5), new Rectangle(10, 5)];
shapes.forEach(function (shape) {
    console.log(shape.getArea());
});
var person = {
    name: '김사람',
    age: 20
};
var expert = {
    name: '김개발',
    skills: ['javascript', 'react']
};
var people = [person, expert];
//=====================
