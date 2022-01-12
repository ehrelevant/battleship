import Ship from "./ship.js";
import { determineWinner } from "../index.js";

const Cell = () => {
  const rets = {
    isChecked: false,

    ship: null,
    shipIndex: null,
    assignShip(ship, index) {
      rets.ship = ship;
      rets.shipIndex = index;
    },
    hasShip() {
      return rets.ship !== null;
    },
  };

  return rets;
};

const Gameboard = (size) => {
  const sideLength = size;
  const board = _createBoardGrid(size);
  const ships = [];
  const missed = [];

  let nextShipLengths = [5, 4, 3, 3, 2];

  function _createBoardGrid(size) {
    let grid = Array(size);
    for (let r = 0; r < size; r++) {
      grid[r] = Array(size);
      for (let c = 0; c < size; c++) {
        grid[r][c] = Cell();
      }
    }

    return grid;
  }

  function _assignShipCells(ship) {
    const length = ship.length;
    const startPos = ship.pos;
    const orie = ship.orie;

    let toOccupyCells = [];

    for (let i = 0; i < length; i++) {
      let cell = undefined;
      if (orie === "horizontal") {
        if (startPos.x + i < sideLength) {
          cell = getCell({
            x: startPos.x + i,
            y: startPos.y,
          });
        }
      } else if (orie === "vertical") {
        if (startPos.y + i < sideLength) {
          cell = getCell({
            x: startPos.x,
            y: startPos.y + i,
          });
        }
      }
      toOccupyCells.push([cell, i]);
    }

    const areLegalPlacements = toOccupyCells.every((cell) => {
      if (cell[0] === undefined) {
        return false;
      }
      if (cell[0].hasShip()) {
        return false;
      }
      return true;
    });

    if (areLegalPlacements) {
      toOccupyCells.forEach((cell) => {
        cell[0].assignShip(ship, cell[1]);
      });
      return true;
    }
    return false;
  }

  function areAllShipsSunk() {
    return rets.ships
      .map((ship) => {
        return ship.isSunk();
      })
      .every((boolValue) => {
        return boolValue === true;
      });
  }

  function getCell(pos) {
    return rets.board[pos.y][pos.x];
  }


  function areAllShipsPlaced() {
    return nextShipLengths.length <= 0;
  }

  function setShip(pos, orie) {
    const length = nextShipLengths[0];
    const ship = Ship(length, pos, orie);
    const result = _assignShipCells(ship);
    if (result) {
      rets.ships.push(ship);
      nextShipLengths.shift();
    }
  }

  function scrambleShips() {
    while (!rets.areAllShipsPlaced()) {
      const randOrie = (Math.floor(Math.random() * 2)) ? 'horizontal' : 'vertical';
      const randX = Math.floor(Math.random() * sideLength);
      const randY = Math.floor(Math.random() * sideLength);

      rets.setShip({x: randX, y: randY}, randOrie);
    }
  }

  function recieveAttack(pos) {
    const cell = getCell({
      x: pos.x,
      y: pos.y,
    });
    if (cell.hasShip()) {
      const ship = cell.ship;
      const shipIndex = cell.shipIndex;
      ship.hit(shipIndex);

      if (ship.isSunk()) {
        // Ship sunken code here
        console.log("SHIP SUNK");
      }
    } else {
      rets.missed.push(pos);
    }
    cell.isChecked = true;

    if (areAllShipsSunk()) {
      // Gameover code/function call here
      determineWinner();
    }
  }

  function wasCellChecked(pos) {
    return getCell(pos).isChecked === true;
  }

  const rets = {
    sideLength,
    board,
    ships,
    missed,

    getCell,
    setShip,
    areAllShipsSunk,
    areAllShipsPlaced,
    scrambleShips,
    recieveAttack,
    wasCellChecked,
  };

  return rets;
};

export default Gameboard;
