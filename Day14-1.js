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

const makeOneRound = function(poly, rules) {
  let newPoly = poly[0];
  for(let i = 1; i < poly.length; i++) {
    newPoly += rules[poly[i-1]+poly[i]] + poly[i]
  }
  return newPoly;
}

const calculateFrequencyDiff = function(poly, rules, n) {
  for(let i = 1; i <= n; i++) {
    poly = makeOneRound(poly, rules)
  }
  
  const letterFreq = {}
  for(const letter of poly) {
    Object.keys(letterFreq).includes(letter) ? letterFreq[letter]++ : letterFreq[letter] = 1;
  }

  let maxFreq = 0;
  let minFreq = poly.length;
  for(const freq in letterFreq) {
    if (letterFreq[freq] > maxFreq) { maxFreq = letterFreq[freq] }
    if (letterFreq[freq] < minFreq) { minFreq = letterFreq[freq] }
  }

  return maxFreq - minFreq;
}

example = formatInput(example)
console.log("Frequency interval (example): ", calculateFrequencyDiff(example.poly, example.rules, 10))
console.assert(typeof calculateFrequencyDiff(example.poly, example.rules, 10) === 'number', 
  'Function does not return a number.')
console.assert(calculateFrequencyDiff(example.poly, example.rules, 10) === 1588, 
  'Function does not return correct value.')