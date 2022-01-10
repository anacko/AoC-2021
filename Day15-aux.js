/**
 * Returns all possible positions of n elements distributed in t slots.
 * @param {Number} n is the number of elements to be distributed. 
 * @param {Number} t is the number of slots available.
 * @returns Array of arrays: all possible positions.
 */
const genConfigs = function(n, t) {

  if (n > t) { return "Not possible. More elements than slots." }

  // Set initial configuration and inserts in the list
  const allConfig = [[]];
  for(i = 0; i < n; i++) { allConfig[0].push(i) }


  // Set new configuration:
  let v = t - n;
  let k = n - 1;
  while (k >= 0) {
    // 1. Get last configuration available
    const currentConfig = [...allConfig[allConfig.length - 1]]
    
    // 2. Compare values with the max for each position: from where to change
    k = n - 1;
    while(currentConfig[k] >= v + k) { k--; }
    
    // 3. New values to input: current value + 1 and adding 1 each element forward
    let currentVal = currentConfig[k]
    const newVals = Array(n - k).fill(currentVal + 1).map((elem, idx) => elem + idx)

    // 4. Replace old values (1) from starting point (2) with new values (3)
    let newConfig = currentConfig.slice(0, k)
    newConfig.push(...newVals)

    // 5. Add new configuration to the list, repeat.
    allConfig.push(newConfig)
  }

  // Last entry is redundant.
  // Removing last entry is faster than a comparison at each step of the while loop.
  allConfig.pop()

  return allConfig
}

const genPaths = function(n, t) {
  const allConfigs = genConfigs(n,t);
  const allPaths = [];

  for(let config of allConfigs) {
    path = 'j'.repeat(t);
    config.map(pos => {
      path = path.substring(0, pos) + 'i' +path.substring(pos + 1)
    })
    allPaths.push(path)
  }
  return allPaths
}

module.exports = { genConfigs, genPaths};

/*
PURPOSE:
This function returns a list with the positions of all possible configurations when
some elements are distributed in slots.

Example. genConfigs(3,6) is for 3 elements in 6 slots.
Each number represents the position of each (1) in all possible configurations.

0 1 2: 111000
0 1 3: 110100
0 1 4: 110010
0 1 5: 110001
0 2 3: 101100
0 2 4: 101010
0 2 5: 101001
0 3 4: 100110
0 3 5: 100101
0 4 5: 100011

1 2 3: 011100
1 2 4: 011010
1 2 5: 011001
1 3 4: 010110
1 3 5: 010101
1 4 5: 010011

2 3 4: 001110
2 3 5: 001101
2 4 5: 001011

3 4 5: 000111
*/
