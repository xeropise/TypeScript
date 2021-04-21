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


