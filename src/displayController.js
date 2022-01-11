import { game } from "./index.js";

const displayController = (() => {
  const displayGamePanels = document.querySelectorAll('.game-panel');
  const displayGameboards = document.querySelectorAll('.gameboard');

  const playerDisplayGameboard = displayGameboards[0];
  const opponentDisplayGameboard = displayGameboards[1];

  let selectedRotation = 'vertical';

  function clearDisplayBoard(displayGameboard) {
    displayGameboard.textContent = '';
  }

  function renderPlayerBoard(gameboard) {
    const displayGameboard = playerDisplayGameboard;
    clearDisplayBoard(displayGameboard);

    const displayGrid = elementBuilder.buildPlayerBoard(gameboard);
    if (!gameboard.areAllShipsPlaced()) {
      displayGrid.addEventListener('click', (evt) => _addShip(evt, gameboard), true);
    }
    displayGameboard.appendChild(displayGrid);
  }

  function _addShip(evt, gameboard) {
    const size = gameboard.sideLength;

    const target = evt.target;
    if (target.classList.contains('board-cell')) {
      const gridCells = target.parentNode.children;
      const targetIndex =  Array.from(gridCells).indexOf(target);

      const targetRow = Math.floor(targetIndex / size);
      const targetCol = targetIndex % size;

      gameboard.setShip({x:targetCol, y:targetRow}, selectedRotation);

      renderPlayerBoard(gameboard)
      if(gameboard.areAllShipsPlaced()) {
        game();
      }
    }
  }

  function renderOpponentBoard(gameboard) {
    const displayGameboard = opponentDisplayGameboard;
    const displayGrid = elementBuilder.buildPlayerBoard(gameboard);
    displayGameboard.appendChild(displayGrid);
  }

  const rets = {
    renderPlayerBoard,
    renderOpponentBoard
  };

  return rets;
})();

const elementBuilder = (() => {
  function buildPlayerBoard(gameboard) {
    const boardGrid = document.createElement('div');
    boardGrid.classList.add('board-grid');

    for (let row of gameboard.board) {
      for (let cell of row) {
        const boardCell = document.createElement('div');
        boardCell.classList.add('board-cell');

        if (cell.hasShip()) {
          boardCell.classList.add('live-ship-cell');
        } else if (cell.isChecked) {
          boardCell.classList.add('cell-checked');
        }

        boardGrid.appendChild(boardCell);
      }
    }

    return boardGrid;
  }

  return {
    buildPlayerBoard
  };
})();

export default displayController;