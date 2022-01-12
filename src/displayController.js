import { game, gamePlayerTurn } from "./index.js";

let inGameloop = false;
let selectedRotation = 'vertical';

const displayController = (() => {
  const displayGamePanels = document.querySelectorAll('.game-panel');
  const displayGameboards = document.querySelectorAll('.gameboard');

  const playerDisplayGameboard = displayGameboards[0];
  const opponentDisplayGameboard = displayGameboards[1];

  function clearDisplayBoard(displayGameboard) {
    displayGameboard.textContent = '';
  }

  function renderPlayerBoard(player) {
    const gameboard = player.gameboard;
    const displayGameboard = playerDisplayGameboard;
    clearDisplayBoard(displayGameboard);

    const displayGrid = elementBuilder.buildPlayerBoard(gameboard);
    if (!gameboard.areAllShipsPlaced()) {
      displayGrid.addEventListener('click', (evt) => addShip(evt, player), true);
    }
    displayGameboard.appendChild(displayGrid);
  }

  function renderOpponentBoard(opponent) {
    const gameboard = opponent.gameboard;
    const displayGameboard = opponentDisplayGameboard;
    clearDisplayBoard(displayGameboard);

    const displayGrid = elementBuilder.buildOpponentBoard(gameboard);
    if (inGameloop) {
      displayGrid.addEventListener('click', (evt) => gamePlayerTurn(evt), true);
    }
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

        if (cell.hasShip() && cell.isChecked) {
          boardCell.classList.add('dead-ship-cell');
        } else if (cell.hasShip()) {
          boardCell.classList.add('live-ship-cell');
        } else if (cell.isChecked) {
          boardCell.classList.add('cell-checked');
        }

        boardGrid.appendChild(boardCell);
      }
    }

    return boardGrid;
  }

  function buildOpponentBoard(gameboard) {
    const boardGrid = document.createElement('div');
    boardGrid.classList.add('board-grid');

    for (let row of gameboard.board) {
      for (let cell of row) {
        const boardCell = document.createElement('div');
        boardCell.classList.add('board-cell');

        if (cell.hasShip() && cell.isChecked) {
          boardCell.classList.add('dead-ship-cell');
        } else if (cell.isChecked) {
          boardCell.classList.add('cell-checked');
        }

        boardGrid.appendChild(boardCell);
      }
    }

    return boardGrid;
  }

  return {
    buildPlayerBoard,
    buildOpponentBoard
  };
})();


function addShip(evt, player) {
  const gameboard = player.gameboard;
  const size = gameboard.sideLength;

  const target = evt.target;
  if (target.classList.contains('board-cell')) {
    const gridCells = target.parentNode.children;
    const targetIndex =  Array.from(gridCells).indexOf(target);

    const targetRow = Math.floor(targetIndex / size);
    const targetCol = targetIndex % size;

    gameboard.setShip({x:targetCol, y:targetRow}, selectedRotation);

    displayController.renderPlayerBoard(player);

    if(gameboard.areAllShipsPlaced()) {
      inGameloop = true;
      game();
    }
  }
}

function disableBoards(players) {
  inGameloop = false;
  displayController.renderPlayerBoard(players[0]);
  displayController.renderPlayerBoard(players[1]);
}




export default displayController;
export { disableBoards };