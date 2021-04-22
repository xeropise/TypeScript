"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var person2 = {
    name: '김사람'
};
var expert2 = {
    name: '김개발',
    skills: ['javsascript', 'react']
};
var color = 'red';
var colors = ['red', 'orange'];
//=========================
// function merge(a: any, b: any): any {
//     return {
//         ...a,
//         ...b,
//     };
// }
// const merged = merge( { foo: 1 }, { bar:1 });
function merge(a, b) {
    return __assign(__assign({}, a), b);
}
var merged = merge({ foo: 1 }, { bar: 1 });
function wrap(param) {
    return {
        param: param
    };
}
var wrapped = wrap(10);
var items = {
    list: ['a', 'b', 'c']
};
