import displayController from "./displayController";
import gameController from "./gameController";

const gameEvents = (() => {
  const playerDisplayGrid = document.querySelector('#player .gameboard');
  const opponentDisplayGrid = document.querySelector('#opponent .gameboard');

  function attachAddShipEvents(humanPlayer, opponentPlayer, shipLength) {
    playerDisplayGrid.addEventListener('mouseenter', (e) => _setShipHighlight(e, humanPlayer, shipLength, true), true);;
    playerDisplayGrid.addEventListener('mouseleave', (e) => _setShipHighlight(e, humanPlayer, shipLength, false), true);;
  }

  function attachAttackEvents(humanPlayer, opponentPlayer) {
    opponentDisplayGrid.addEventListener('mouseenter', (e) => _setAttackHighlight(e, true), true);;
    opponentDisplayGrid.addEventListener('mouseleave', (e) => _setAttackHighlight(e, false), true);
    opponentDisplayGrid.addEventListener('click', (e) => _attackOpponentCellOnGrid(e, humanPlayer, opponentPlayer), true);
  }

  function clearGridEvents() {
    clearAllElementEvents(playerDisplayGrid);
    clearAllElementEvents(opponentDisplayGrid);
  }

  function clearAllElementEvents(element) {
    const oldElement = element;
    const clearedElement = oldElement.cloneNode(true);
    oldElement.parentNode.replaceChild(clearedElement, oldElement);
  }


  function _setShipHighlight(e, player, length, highlighted) {
    const target = e.target;
    if (target.classList.contains('board-cell')) {
      const playerGameboard = player.gameboard;

      const size = playerGameboard.sideLength;
      const gridCellList = target.parentNode.children;
      const targetIndex =  Array.from(gridCellList).indexOf(target);

      let toHighlightCells = [];
      for(let i = 0; i < length; i++) {
        const gridCellIndex = targetIndex + i;
        toHighlightCells.push(gridCellList[gridCellIndex]);
        if ((gridCellIndex % size) + 1 >= size) {
          break;
        }
        /*
        const gridCellIndex = targetIndex + (i * size);
        toHighlightCells.push(gridCellList[gridCellIndex]);
        if (Math.floor(gridCellIndex / size) + 1 >= size) {
          break;
        }
        */
      }

      toHighlightCells.forEach((cell) => {
        if(highlighted) {
          cell.classList.add('highlighted');
        } else {
          cell.classList.remove('highlighted');
        }
      });
    }
  }

  function _attackOpponentCellOnGrid(e, player, opponent) {
    const target = e.target;

    if (target.classList.contains('board-cell')) {
      const targetPos = _getTargetPos(target, opponent.gameboard);

      const isLegalMove = player.attackOpponent(opponent, targetPos);
      if (isLegalMove) {
        gameController.completeGameTurn(player, opponent);
        _checkForWinner(player, opponent);
      }
    }
  }

  function _getTargetPos(target, gameboard) {
    const size = gameboard.sideLength;
    const gridCellList = target.parentNode.children;
    const targetIndex =  Array.from(gridCellList).indexOf(target);

    const targetX = targetIndex % size;
    const targetY = Math.floor(targetIndex / size);

    return {x:targetX, y:targetY};
  }

  function _checkForWinner(player, opponent) {
    if (player.isWinner) {
      gameController.declareWinner(player);
    } else if (opponent.isWinner) {
      gameController.declareWinner(opponent);
    }
  }

  function _setAttackHighlight(e, highlighted) {
    const target = e.target;
    if (target.classList.contains('board-cell')) {
      if (highlighted) {
        target.classList.add('highlighted');
      } else {
        target.classList.remove('highlighted');
      }
    }
  }


  const rets = {
    attachAddShipEvents,
    attachAttackEvents,
    clearGridEvents,
  };

  return rets;
})();


export default gameEvents;