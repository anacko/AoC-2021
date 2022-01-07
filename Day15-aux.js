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

// for(i = 0; i < 6; i++) {
//   for(j = i+1; j < 6; j++) {
//     for(k = j+1; k < 6; k++) {
//       console.log(i, "-", j, "-", k)
//     }
//   }
// }



const genConfigs = function(n, t) {
  const allConfig = [[]]
  for(i = 0; i < n; i++) { allConfig[0].push(i) }

  // move element in pos
  let currentPos = n - 1 // last elem pos
  while(currentPos >=0){

    const currentConfig = [...allConfig[allConfig.length - 1]]
    let currentVal = currentConfig[currentPos]
    
    for(i = 1; i < t - n + currentPos; i++) {
      let newConfig = currentConfig.slice(0, currentPos)
      newConfig.push(currentVal + i)
      newConfig.push(...currentConfig.slice(currentPos + 1))
      allConfig.push(newConfig)
    }
    
    currentPos--;
  }

  return allConfig
}
//console.log(genConfigs(3, 6))


let n = 5;
let t = 7;
const firstConfig = []
for(i = 0; i < n; i++) { firstConfig.push(i) }

const allConfig = [[...firstConfig]]

const lastConfig = []
for(i = t - n; i < t; i++) { lastConfig.push(i) }

let k = 1
while (k) {
  const currentConfig = [...allConfig[allConfig.length - 1]]

  k = 0;
  while(k < lastConfig.length) {
    if(currentConfig[k] !== lastConfig[k]) { k++; } else { break; }
  }
  let currentPos = k - 1;

  let currentVal = currentConfig[currentPos]
  while (currentVal < t - n + currentPos) {
    currentVal++;
    let newConfig = currentConfig.slice(0, currentPos)
    newConfig.push(currentVal)
    newConfig.push(...currentConfig.slice(currentPos + 1))  
    allConfig.push(newConfig)
  }
}

console.log(allConfig)