let example = `5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526`;

const formatInput = function(input) {
  input = input.split('\n').map(line => line.split('').map(elem => parseInt(elem)))
  return input
}

example = formatInput(example)
console.log(example)

const singleStep = function(octoMap) {
  const increaseMap = [];
  const didFlash = [];

  // All get +1 luminosity
  for (let j = 0; j < octoMap.length; j++) {
    increaseMap.push([]);
    for (let i = 0; i < octoMap[j].length; i++) {
      increaseMap[j].push(1)
    }
  }

  // LOOP: flashers -> energize -> new flashers -> more energy -> etc.
  while (true) {
    // See who will flash
    const willFlash = [];
    for (let j = 0; j < octoMap.length; j++) {
      for (let i = 0; i < octoMap[j].length; i++) {
        let isValid = true;
        didFlash.map(pos => { if (pos[0] === j && pos[1] === i) { isValid = false; } })
        if (isValid) {
          const newVal = octoMap[j][i] + increaseMap[j][i];
          if (newVal > 9) { 
            willFlash.push([j, i]);
            didFlash.push([j, i]);
          }
        }
      }
    }
    
    // if nobody will flash, exit loop
    if (willFlash.length === 0) break;
    
    // else: Energize neighbours
    willFlash.map(pair => {
      const limY = octoMap.length - 1;
      const limX = octoMap[pair[0]].length - 1;
      if (pair[0] !== 0) { increaseMap[pair[0] - 1][pair[1]]++ }
      if (pair[0] !== limY) { increaseMap[pair[0] + 1][pair[1]]++ }
      if (pair[1] !== 0) { increaseMap[pair[0]][pair[1] - 1]++ }
      if (pair[1] !== limX) { increaseMap[pair[0]][pair[1] + 1]++ }
      if (pair[0] !== 0 && pair[1] !== 0) { increaseMap[pair[0] - 1][pair[1] - 1]++ }
      if (pair[0] !== 0 && pair[1] !== limX) { increaseMap[pair[0] - 1][pair[1] + 1]++ }
      if (pair[0] !== limY && pair[1] !== 0) { increaseMap[pair[0] + 1][pair[1] - 1]++ }
      if (pair[0] !== limY && pair[1] !== limX) { increaseMap[pair[0] + 1][pair[1] + 1]++ }
    }); 
  }  
  
  // New configuration after all energy is spread
  const newMap = [];
  for (let j = 0; j < octoMap.length; j++) {
    newMap.push([]);
    for (let i = 0; i < octoMap[j].length; i++) {
      const newVal = octoMap[j][i] + increaseMap[j][i];
      newMap[j].push(newVal > 9 ? 0 : newVal);
    }
  }
  return { map: newMap, nFlashes: didFlash.length};
}

const makeNSteps = function(map, n) {
  let afterStep = singleStep(map);
  let sumN = afterStep.nFlashes;
  for(i = 1; i < n; i++) {
      afterStep = singleStep(afterStep.map);
      sumN += afterStep.nFlashes;
  }
  return sumN;
}

console.log(makeNSteps(example, 2))