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
  //console.log(newPairsFreq)

  for(const pair in pairsFreq) {
    if(pairsFreq[pair]) {
    // register new letter
    //console.log("Bef. ",pair, newPairsFreq[pair], newPairsFreq[pairsRules[pair][0]], newPairsFreq[pairsRules[pair][1]])
    letterFreq[rules[pair]]++;
    
    // replace current pair with the two new ones
    newPairsFreq[pairsRules[pair][0]]++;
    newPairsFreq[pairsRules[pair][1]]++;
    newPairsFreq[pair]--;
    //console.log("Aft. ",pair, newPairsFreq[pair], newPairsFreq[pairsRules[pair][0]], newPairsFreq[pairsRules[pair][1]])
  }}
  
  return { letterFreq, newPairsFreq };
}

const calculateFrequencyDiff = function(poly, rules, n) {

  let letterFreq = {B: 0, C: 0, H:0, N:0}
  for(const letter of poly) { letterFreq[letter]++; }

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

  let maxFreq = 0;
  let minFreq = pairsFreq['CC'];
  for(const freq in letterFreq) {
    if (letterFreq[freq] > maxFreq) { maxFreq = letterFreq[freq] }
    if (letterFreq[freq] < minFreq) { minFreq = letterFreq[freq] }
  }

  return maxFreq - minFreq;
}

example = formatInput(example)
console.log("Frequency interval (example): ", calculateFrequencyDiff(example.poly, example.rules, 10))
// console.assert(typeof calculateFrequencyDiff(example.poly, example.rules, 10) === 'number', 
//   'Function does not return a number.')
// console.assert(calculateFrequencyDiff(example.poly, example.rules, 10) === 1588, 
//   'Function does not return correct value.')

// // Challenge 1
// const fs = require('fs');
// fs.readFile('./Day14.txt', 'utf8', (err, data) => {
//   let input = formatInput(data);
//   console.log('Frequency interval (14-1): ', calculateFrequencyDiff(input.poly, input.rules, 10));
// })