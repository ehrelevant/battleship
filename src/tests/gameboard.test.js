import Gameboard from '../gameboard.js';

test('Gameboard generates', () => {
  const board = Gameboard(10);

  const defaultCell = {
    isChecked: false,
    ship: null,
    shipIndex: null
  };
  const comparisonBoard = Array(10).fill(Array(10).fill(defaultCell));

  expect(board).toMatchObject({
    board: comparisonBoard
  });
});

test('Adds ship', () => {
  // Writing this test was especially difficult as the
  // comparison needed to be created as well
  const inputSize = 10

  const board = Gameboard(inputSize);
  board.setShip(3, {x: 0, y: 0}, 'horizontal');

  const defaultCell = {
    isChecked: false,
    ship: null,
    shipIndex: null
  };
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
    board: comparisonBoard
  });
});
