const elementBuilder = (() => {
  function buildPlayerGrid(gameboard) {
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

  const rets = {
    buildPlayerGrid,
  };

  return rets;
})();

export default elementBuilder;