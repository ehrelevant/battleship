import elementBuilder from "./elementBuilder";

const displayController = (() => {
  const outputText = document.querySelector('#output_text')

  function _clearDisplayGrid(grid) {
    grid.textContent = '';
  }

  function renderPlayerGameboard(gameboard) {
    // Grid queries are inside functions as element cloning breaks the query
    const playerDisplayGrid = document.querySelector('#player .gameboard');
    _clearDisplayGrid(playerDisplayGrid);
    const displayGrid = elementBuilder.buildPlayerGrid(gameboard);
    playerDisplayGrid.appendChild(displayGrid);
  }

  function renderOpponentGameboard(gameboard) {
    const opponentDisplayGrid = document.querySelector('#opponent .gameboard');
    _clearDisplayGrid(opponentDisplayGrid);
    const displayGrid = elementBuilder.buildOpponentGrid(gameboard);
    opponentDisplayGrid.appendChild(displayGrid);
  }

  function editOutputText(newText) {
    outputText.textContent = newText;
  }

  const rets = {
    renderPlayerGameboard,
    renderOpponentGameboard,
    editOutputText
  };

  return rets;
})();

export default displayController;