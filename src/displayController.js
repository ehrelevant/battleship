import elementBuilder from "./elementBuilder";

const displayController = (() => {
  const playerDisplayGrid = document.querySelector('#player .gameboard');
  const opponentDisplayGrid = document.querySelector('#opponent .gameboard');

  function _clearDisplayGrid(grid) {
    grid.textContent = '';
  }

  function renderPlayerGameboard(gameboard) {
    _clearDisplayGrid(playerDisplayGrid);
    const displayGrid = elementBuilder.buildPlayerGrid(gameboard);
    playerDisplayGrid.appendChild(displayGrid);
  }

  function renderOpponentGameboard(gameboard) {
    _clearDisplayGrid(opponentDisplayGrid);
    const displayGrid = elementBuilder.buildPlayerGrid(gameboard);
    opponentDisplayGrid.appendChild(displayGrid);
  }

  const rets = {
    renderPlayerGameboard,
    renderOpponentGameboard,
  };

  return rets;
})();

export default displayController;