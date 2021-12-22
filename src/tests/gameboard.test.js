import Gameboard from '../gameObjects/gameboard.js';

const defaultCell = {
  isChecked: false,
  ship: null,
  shipIndex: null,
};

test('Gameboard generates', () => {
  const board = Gameboard(10);

  const comparisonBoard = Array(10).fill(Array(10).fill(defaultCell));

  expect(board).toMatchObject({
    board: comparisonBoard
  });
});

test('Adds ship', () => {
  // Writing this test was especially painful as the
  // comparison needed to be created as well
  const inputSize = 10

  const board = Gameboard(inputSize);
  board.setShip(3, {x: 0, y: 0}, 'horizontal');

  let comparisonBoard = Array(inputSize);
  for (let r = 0; r < inputSize; r++) {
    comparisonBoard[r] = Array(inputSize);
    for (let c = 0; c < inputSize; c++) {
      comparisonBoard[r][c] = defaultCell;
    }
  }

  comparisonBoard[0][0] = {
    isChecked: false,
    ship: { },
    shipIndex: 0,
  };
  comparisonBoard[0][1] = {
    isChecked: false,
    ship: { },
    shipIndex: 1,
  };
  comparisonBoard[0][2] = {
    isChecked: false,
    ship: { },
    shipIndex: 2,
  };

  expect(board).toMatchObject({
    board: comparisonBoard,
    ships: [ { } ]
  });
});


test('Gameboard recieves attack and misses', () => {
  const inputSize = 10

  const board = Gameboard(inputSize);
  board.setShip(1, {x: 4, y: 4}, 'horizontal');
  board.recieveAttack({x: 0, y: 0});
  board.recieveAttack({x: 3, y: 2});

  let comparisonBoard = Array(inputSize);
  for (let r = 0; r < inputSize; r++) {
    comparisonBoard[r] = Array(inputSize);
    for (let c = 0; c < inputSize; c++) {
      comparisonBoard[r][c] = defaultCell;
    }
  }

  comparisonBoard[0][0] = {
    isChecked: true,
    ship: null,
    shipIndex: null,
  };
  comparisonBoard[2][3] = {
    isChecked: true,
    ship: null,
    shipIndex: null,
  };
  comparisonBoard[4][4] = {
    isChecked: false,
    ship: { },
    shipIndex: 0,
  };

  expect(board).toMatchObject({
    board: comparisonBoard,
    ships: [ {cells: [true]} ],
    missed: [ {x: 0, y: 0}, {x: 3, y: 2} ]
  });
});

test('Gameboard recieves attack and hits', () => {
  const inputSize = 10

  const board = Gameboard(inputSize);
  board.setShip(1, {x: 4, y: 4}, 'horizontal');
  board.recieveAttack({x: 4, y: 4});

  let comparisonBoard = Array(inputSize);
  for (let r = 0; r < inputSize; r++) {
    comparisonBoard[r] = Array(inputSize);
    for (let c = 0; c < inputSize; c++) {
      comparisonBoard[r][c] = defaultCell;
    }
  }

  comparisonBoard[4][4] = {
    isChecked: true,
    ship: {cells: [false]},
    shipIndex: 0,
  };

  expect(board).toMatchObject({
    board: comparisonBoard,
    ships: [ {cells: [false]} ],
    missed: [ ]
  });
});