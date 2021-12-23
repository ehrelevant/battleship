const displayController = (() => {
  const gamePanels = document.querySelectorAll('.game-panel');
  const gameboards = document.querySelectorAll('.gameboard');

  function createBoards(size) {
    gameboards.forEach(gameboard => {
      const grid = elementBuilder.buildBoard(size);
      gameboard.appendChild(grid);

      gameboard.addEventListener('mouseover', (evt) => {
        const target = evt.target;
        if(target.classList.contains('board-cell')) {
          console.log(target);
        }
      }, true);
    });
  }

  const rets = {
    createBoards
  };

  return rets;
})();

const elementBuilder = (() => {
  function buildBoard(size) {
    const boardGrid = document.createElement('div');
    boardGrid.classList.add('board-grid');

    for (let rowInd = 0; rowInd < size; rowInd++) {
      const boardRow = document.createElement('div');
      boardRow.classList.add('board-row');

      for (let cellInd = 0; cellInd < size; cellInd++) {
        const boardCell = document.createElement('div');
        boardCell.classList.add('board-cell');

        boardRow.appendChild(boardCell);
      }
      boardGrid.appendChild(boardRow);
    }

    return boardGrid;
  }

  return {
    buildBoard
  };
})();

export default displayController;