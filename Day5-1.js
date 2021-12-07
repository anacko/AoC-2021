let example = `0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2`;

const formatInput = function(input) {

  input = input
    .split('\n')
    .map(line => line
      .split(' -> ')
      .map(coord => coord
        .split(',')
        .map(info => Number(info))));

  return input;
}

const keepHV = function(input) {
  const validLines = [];
  input.map(line =>{
    if (line[0][0] === line[1][0] || line[0][1] === line[1][1]) {
      validLines.push(line);
    }
  })
  return validLines;
}

const lineInstructions = function(line) {

  let direction, posX, posY;

  if (line[0][0] === line[1][0]) {
    direction = "H";
    posX = line[0][0];
    posY = [...Array(Math.abs(line[0][1] - line[1][1]) + 1).keys()].map(elem => elem + Math.min(line[0][1], line[1][1]))
  }
  
  if (line[0][1] === line[1][1]) {
    direction = "V";
    posY = line[0][1];
    posX = [...Array(Math.abs(line[0][0] - line[1][0]) + 1).keys() ].map(elem => elem + Math.min(line[0][0], line[1][0]))
  }

  return { direction, posX, posY }
}

const sumDangerousAreas = function(input) {
  
  // Make map with all 0:
  const xPos = [];
  const yPos = [];
  input.map(line => {
    xPos.push(line[0][0]); xPos.push(line[1][0]);
    yPos.push(line[0][1]); yPos.push(line[1][1]);
  })

  const map = [];
  for(let j = 0; j <= Math.max(...yPos); j++) {
    map.push([]);
    for(let i = 0; i <= Math.max(...xPos); i++) {
      map[j].push(0)
    }
  }

  // Mark the Map with instructions
  const instructions = input.map(line => lineInstructions(line))  
  for (const inst of instructions) {
    if (inst.direction === 'V') {
      for (let i = 0; i < inst.posX.length; i++) {
        map[inst.posY][inst.posX[i]]++
      }
    }
    if (inst.direction === 'H') {
      for (let j = 0; j < inst.posY.length; j++) {
        map[inst.posY[j]][inst.posX]++
      }
    }
  }

  // Count how many has value more than 1
  let sumAboveOnes = 0;
  for(let j = 0; j <= Math.max(...yPos); j++) {
    for(let i = 0; i <= Math.max(...xPos); i++) {
      map[j][i] > 1 ? sumAboveOnes++ : null;
    }
  }

  return sumAboveOnes
}

example = formatInput(example);
example = keepHV(example);
console.log('Sum of all dangerous areas (example): ', sumDangerousAreas(example));

// Challenge 1

const fs = require('fs');
fs.readFile('./Day5.txt', 'utf8', (err, data) => {
  let input = formatInput(data)
  input = keepHV(input);
  console.log('Sum of all dangerous areas (5-1): ', sumDangerousAreas(input))
})