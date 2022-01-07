let example = `1163751742
1381373672
2136511328
3694931569
7463417111
1319128137
1359912421
3125421639
1293138521
2311944581`;

const formatInput = function(input) {
  return input.split('\n').map(line => line.split('').map(elem => parseInt(elem)))
}

const sumPath = function(sequence, input) {
  // sequence is array: [i, i, i, i, i, j, j, i, i, j, j, j, i, i, j, j, i...]
  let i = 0;
  let j = 0;
  let sumPath = 0;
  sequence.map(move => {
    move === 'i' ? i++ : j++;
    sumPath += input[i][j];
  });
  
  return sumPath;
}

const genPaths = function(nrows, ncols) {
  const allPaths = []
  for(i = 0; i < nrows; i++) {
    for(j = 0; j < ncols; j++) {

    }
  }
  return false;
}

/*
0 1 2: iiijjj
0 1 3: iijijj
0 1 4: iijjij
0 1 5: iijjji
0 2 3: ijiijj
0 2 4: ijijij
0 2 5: ijijji
0 3 4: ijjiij
0 3 5: ijjiji
0 4 5: ijjjii

1 2 3: jiiijj
1 2 4: jiijij
1 2 5: jiijji
1 3 4: jijiij
1 3 5: jijiji
1 4 5: jijjii

2 3 4: jjiiij
2 3 5: jjiiji
2 4 5: jjijii

3 4 5: jjjiii
*/

for(i = 0; i < 6; i++) {
  for(j = i+1; j < 6; j++) {
    for(k = j+1; k < 6; k++) {
      console.log(i, "-", j, "-", k)
    }
  }
}



// example = formatInput(example);
// console.log(example)

// const path = 'iijjjjjjijiijiiiji'
// console.log(sumPath(path.split(''), example))


// console.log("Frequency interval (example): ", calculateFrequencyDiff(example.poly, example.rules, 40));
// console.assert(typeof calculateFrequencyDiff(example.poly, example.rules, 40) === 'number', 
//   'Function does not return a number.');
// console.assert(calculateFrequencyDiff(example.poly, example.rules, 40) === 2188189693529, 
//   'Function does not return correct value.');

// Challenge 1
// const fs = require('fs');
// fs.readFile('./Day14.txt', 'utf8', (err, data) => {
//   let input = formatInput(data);
//   console.log('Frequency interval (14-2): ', calculateFrequencyDiff(input.poly, input.rules, 40));
// })

const genConfigs = function(n, t) {
  const allConfig = [[0, 1, 2]]

  // move last element
  const currentConfig = [...allConfig[allConfig.length - 1]]
  let currentPos = 2 // n - 1 is last elem pos
  let currentVal = currentConfig[currentPos]
  
  for(i = 1; i < t - currentPos; i++) {
    let newConfig = currentConfig.slice(0, currentPos)
    newConfig.push(currentVal + i)
    newConfig.push(...currentConfig.slice(currentPos + 1))
    allConfig.push(newConfig)
  }
  return allConfig
}
console.log(genConfigs(3, 6))
