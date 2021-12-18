import Ship from './ship.js'

const Cell = () => {
  const rets = {
    isChecked: false,

    ship: null,
    shipIndex: null,
    assignShip(ship, index) {
      rets.ship = ship;
      rets.shipIndex = index;
    }
  };

  return rets;
};

const Gameboard = (size) => {
  const board = createBoardGrid(size);
  const ships = []

  function createBoardGrid(size) {
    let grid = Array(size);
    for (let r = 0; r < size; r++) {
      grid[r] = Array(size);
      for (let c = 0; c < size; c++) {
        grid[r][c] = Cell();
      }
    }

    return grid;
  }

  function assignShipCells(ship) {
    const length = ship.length;
    const startPos = ship.pos;
    const orie = ship.orie;

    for(let i = 0; i < length; i++) {
      if (orie === 'horizontal') {
        const cell = getCell({
          x: startPos.x + i,
          y: startPos.y
        });
        cell.assignShip(ship, i);
      }
      if (orie === 'vertical') {
        const cell = getCell({
          x: startPos.x,
          y: startPos.y + i
        });
        cell.assignShip(ship, i);
      }
    }
  }

  function getCell(pos) {
    return rets.board[pos.y][pos.x];
  }

  const rets = {
    board,
    ships,

    setShip(length, pos, orie) {
      const ship = Ship(length, pos, orie);
      rets.ships.push(ship);
      assignShipCells(ship);
    },
  };

  return rets;
};

export default Gameboard;