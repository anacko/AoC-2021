let example = `7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19

 3 15  0  2 22
 9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7`

const formatInput = function(input) {
  input = input.split('\n')
  const draw = input[0].split(',').map(n => Number(n))

  input.splice(0, 1)
  const boards = [];
  for(let i = 0; i < input.length; i+=6) {
    const board = [];
    for(let j = 1; j <=5; j++) {
      board.push(
        input[i+j]
          .split(' ')
          .filter(e => !(!e))
          .map(n => Number(n)));
    }
    boards.push(board);
  }
  return { draw, boards };
}

const calculateScore = function(input) {

  // 1 Separate input info: draw list and boards
  const drawList = [...input.draw]

  const boards = [];
  for (const board of input.boards) {
    const newBoard = [];
    for (const line of board) {
      const newLine = [...line]
      newBoard.push(newLine)
    }
    boards.push(newBoard)
  }

  // Marks draw in board (value -1) and checks if it's a winner (line or col sum -5)
  const markAndCheck = function(board, draw) {
    let winner = false;
    for(let j = 0; j < board.length; j++) {
      for(let i = 0; i < board[j].length; i++) {
        if (board[j][i] === draw) {
          board[j][i] = -1;
          
          const sumInLine = board[j].reduce(((p, c) => p + c), 0);
          if (sumInLine === -5) { winner = true }
          
          const colValues = [];
          board.map(line => colValues.push(line[i]));
          const sumInColumn = colValues.reduce(((p, c) => p + c), 0);
          if(sumInColumn === -5) { winner = true }
        }
      }
    }
    return { winner, board }
  }

  // Makes rounds until there is a winner
  let round = 0;
  let draw = 0;
  let winnerBoard = [];
  
  while(!winnerBoard.length && round < drawList.length) {
    draw = drawList[round]
    for (let board of boards) {
      const results = markAndCheck(board, draw)
      if (results.winner) {
        winnerBoard = results.board
      }
    }
    round++;
  }
  
  // Sum all non-draw numbers in winner board and returns score
  let sumBoard = 0;
  winnerBoard.map(line => {
    const sumLine = line.reduce(((p, c) => c === -1 ? p + 0 : p + c), 0);
    sumBoard += sumLine;
  })

  return sumBoard * draw
}

example = formatInput(example);
console.log("Score for Example: ", calculateScore(example))
console.assert(typeof calculateScore(example) === 'number', 'Function not returning number.');
console.assert(calculateScore(example) === 4512, 'Function not returning correct value.');

// Challenge 1

const fs = require('fs');
fs.readFile('./Day4.txt', 'utf8', (err, data) => {
  let input = formatInput(data)
  console.log('Score (4-1): ', calculateScore(input))
})