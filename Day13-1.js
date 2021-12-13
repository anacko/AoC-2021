const { platform } = require("os");

let example = `6,10
0,14
9,10
0,3
10,4
4,11
6,0
6,12
4,1
0,13
10,12
3,4
3,0
8,4
1,10
2,14
8,10
9,0

fold along y=7
fold along x=5`

const formatInput = function(input) {
  input = input.split('\n\n')
  input[0] = input[0].split('\n').map(pair => pair.split(','))
  
  const dots = [];
  input[0].map(pair => dots.push([Number(pair[0]), Number(pair[1])]));
  
  const instructions = [];
  input[1] = input[1].split('\n').map(instruction => instruction.split('='))
  input[1] = input[1].map(instruction => instructions.push([instruction[0].slice(-1), Number(instruction[1])]))
    
  return { dots, instructions }
}

const makeFold = function(dots, instruction) {
  // If it is below/right to the folding position, reflect it to up/left
  // (beyond folding line = higher than instruction[1] value)
  
  // Reflect it by: p' = 2f - p (explanation below all)
  const newDots = [];
  
  const f = instruction[1];
  // Folding up
  if(instruction[0] === 'y') {
    dots.map(p => {
      let isIncluded = false;
      if(p[1] > f) {
        const pLine = [p[0], 2*f - p[1]];
        newDots.map(pos => (pos[0] === pLine[0] && pos[1] === pLine[1]) ? isIncluded = true : null);
        if (!isIncluded) { newDots.push(pLine); }
      } else {
        newDots.map(pos => (pos[0] === p[0] && pos[1] === p[1]) ? isIncluded = true : null);
        if (!isIncluded) { newDots.push(p); }
      }
    })
  }
  // Folding left
  if(instruction[0] === 'x') {
    dots.map(p => {
      let isIncluded = false;
      if(p[0] > f) {
        const pLine = [2*f - p[0], p[1]];
        newDots.map(pos => (pos[0] === pLine[0] && pos[1] === pLine[1]) ? isIncluded = true : null);
        if (!isIncluded) { newDots.push(pLine); }
      } else {
        newDots.map(pos => (pos[0] === p[0] && pos[1] === p[1]) ? isIncluded = true : null);
        if (!isIncluded) { newDots.push(p); }
      }
    })
  }
  
  return newDots;
}

example = formatInput(example);
const firstFold = makeFold(example.dots, example.instructions[0]);
console.log("Dots visible after first fold (example): ",firstFold.length);

console.assert(makeFold(example.dots, example.instructions[0]).length === 17,
  'Function does not return result with the proper length.');



/* 
What means p' = 2f - p ?

p = current position
p' = new position
f = folding line position
d = distance between folding line and dot current/new positions

p = f + d --> current position is the folding line plus the distance from it
p'= f - d --> new position is the folding line less the same distance from it

As d is the same for current and new positions, because it's a rigid folding,
p - f = f - p'

Therefore,
p' = 2f - p

*/

/* 
console.log("Sum of corruption points (example): ", addAllPoints(example));
console.assert(typeof addAllPoints(example) === 'number', 'Function does not return a number.')
console.assert(addAllPoints(example) === 26397, 'Function does not return correct value.')

// Challenge 1

const fs = require('fs');
fs.readFile('./Day10.txt', 'utf8', (err, data) => {
  let input = formatInput(data);
  console.log('Sum of corruption points (10-1): ', addAllPoints(input));
}) */