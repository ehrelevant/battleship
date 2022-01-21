import displayController from "../displayController.js";
import Ship from "./ship.js";
// import { determineWinner } from "../index.js";

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

    // console.log(ship);
    // console.log(toOccupyCells);

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

  function setShip(length, pos, orie) {
    const ship = Ship(length, pos, orie);
    const isSuccess = _assignShipCells(ship);
    if (isSuccess) {
      rets.ships.push(ship);
    }
    return isSuccess;
  }

  function placeShipRandomly(shipLength) {
    while(true) {
      const randOrie = (Math.floor(Math.random() * 2)) ? 'horizontal' : 'vertical';
      const randX = Math.floor(Math.random() * sideLength);
      const randY = Math.floor(Math.random() * sideLength);

      const isSuccess = rets.setShip(shipLength, {x: randX, y: randY}, randOrie);
      if(isSuccess) {
        break;
      }
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
        displayController.editOutputText(`${ship.length}-Cell Long Ship Sunk`)
      }
    } else {
      rets.missed.push(pos);
    }
    cell.isChecked = true;

    return areAllShipsSunk()
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
    placeShipRandomly,
    recieveAttack,
    wasCellChecked,
  };

  return rets;
};

export default Gameboard;
