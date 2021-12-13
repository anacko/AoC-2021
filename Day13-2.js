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

// Folding explanation: Day13-1.js
const makeFold = function(dots, instruction) {
  const newDots = [];
  
  const f = instruction[1];
  if(instruction[0] === 'y') {
    dots.map(p => (p[1] > f) ? newDots.push([p[0], 2*f - p[1]]) : newDots.push(p))
  }
  if(instruction[0] === 'x') {
    dots.map(p => (p[0] > f) ? newDots.push([2*f - p[0], p[1]]) : newDots.push(p))
  }
  
  const uniqueDots = [];
  for(const elem of newDots) {
    let isIncluded = false;
    uniqueDots.map(pos => { (pos[0] === elem[0] && pos[1] === elem[1]) ? isIncluded = true : null });
    (!isIncluded) ? uniqueDots.push(elem) : null;
  }

  return uniqueDots;
};

const buildMap = function(dots, instructions) {
  
  // recursive approach to fold according to instructions
  for(const instruction of instructions) {
    dots = makeFold(dots, instruction);
  }

  // building the map (requires deep comparison)
  let mapSizeX = 0;
  let mapSizeY = 0;
  dots.map(pos => {
    if (pos[0] > mapSizeX) { mapSizeX = pos[0]; }
    if (pos[1] > mapSizeY) { mapSizeY = pos[1]; }
  });

  const map = [];
  for (let j = 0; j <= mapSizeY; j++) {
    map.push([]);
    for (let i = 0; i <= mapSizeX; i++) {
      map[j].push(' ');
    }
  }

  // populating the map
  dots.map(pos => map[pos[1]][pos[0]] = '*');

  // drawing the map
  return map.map(line => line.join(' ')).join('\n');
}

example = formatInput(example);

console.log('Map after performing all folds (example):');
console.log(buildMap(example.dots, example.instructions));

// Challenge 2

const fs = require('fs');
fs.readFile('./Day13.txt', 'utf8', (err, data) => {
  let input = formatInput(data);
  console.log('Map after performing all folds (13-2):');
  console.log(buildMap(input.dots, input.instructions));
});