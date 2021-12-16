let example = `NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C`

const formatInput = function(input) {

  input = input.split('\n')

  const poly = input[0]

  const rules = {};
  input.slice(2).map(rule => rules[rule[0]+rule[1]] = rule[6])

  return { poly, rules }
}

const addPairsRules = function(rules) {
  const newRules = {};
  for(const rule in rules) {
    newRules[rule] = [ rule[0] + rules[rule], rules[rule] + rule[1] ]
  }
  return newRules;
}
const makeOneRound = function(letterFreq, pairsFreq, rules, pairsRules) {
  
  const newPairsFreq = {...pairsFreq}
  
  for(const pair in pairsFreq) {
    if(pairsFreq[pair]) {
      // register new letter
    letterFreq[rules[pair]] += pairsFreq[pair];
    
    // replace current pair with the two new ones
    newPairsFreq[pairsRules[pair][0]] += pairsFreq[pair];
    newPairsFreq[pairsRules[pair][1]] += pairsFreq[pair];
    newPairsFreq[pair] -= pairsFreq[pair];
  }}
  return { letterFreq, newPairsFreq };
}

const calculateFrequencyDiff = function(poly, rules, n) {
  
  let letterFreq = {};
  Object.values(rules).map(letter => letterFreq[letter] = 0)
  console.log(letterFreq)
  for(const letter of poly) { letterFreq[letter]++; }
  console.log(letterFreq)

  let pairsFreq = {};
  for(const rule in rules) { pairsFreq[rule] = 0; }
  for(let i = 1; i < poly.length; i++) {
    const pair = poly[i-1] + poly[i];
    pairsFreq[pair]++;
  }
  
  const pairsRules = addPairsRules(rules);

  for(let i = 1; i <= n; i++) {
    let frequencies = makeOneRound(letterFreq, pairsFreq, rules, pairsRules);
    letterFreq = frequencies.letterFreq;
    pairsFreq = frequencies.newPairsFreq;
  }
  
  let maxFreq = letterFreq[Object.keys(letterFreq)[0]];
  let minFreq = letterFreq[Object.keys(letterFreq)[0]];
  for(const freq in letterFreq) {
    //console.log(freq, letterFreq[freq])
    if (letterFreq[freq] > maxFreq) { maxFreq = letterFreq[freq] }
    if (letterFreq[freq] < minFreq) { minFreq = letterFreq[freq] }
  }

  return maxFreq - minFreq;
}

example = formatInput(example)
console.log("Frequency interval (example): ", calculateFrequencyDiff(example.poly, example.rules, 40))
console.assert(typeof calculateFrequencyDiff(example.poly, example.rules, 40) === 'number', 
  'Function does not return a number.')
console.assert(calculateFrequencyDiff(example.poly, example.rules, 40) === 2188189693529, 
  'Function does not return correct value.')

// Challenge 1
const fs = require('fs');
fs.readFile('./Day14.txt', 'utf8', (err, data) => {
  let input = formatInput(data);
  console.log('Frequency interval (14-1): ', calculateFrequencyDiff(input.poly, input.rules, 40));
})