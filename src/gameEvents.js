import displayController from "./displayController";
import gameController from "./gameController";

const gameEvents = (() => {
  let playerDisplayGrid = document.querySelector('#player .gameboard');
  let opponentDisplayGrid = document.querySelector('#opponent .gameboard');
  const rotateBtn = document.querySelector('#rotate_button');

  let orie = 'horizontal';
  let shipLengths = [5, 4, 3, 3, 2]

  function attachAddShipEvents(humanPlayer, opponentPlayer) {
    playerDisplayGrid.addEventListener('mouseenter', (e) => _setShipHighlight(e, humanPlayer, true), true);
    playerDisplayGrid.addEventListener('mouseleave', (e) => _setShipHighlight(e, humanPlayer, false), true);
    playerDisplayGrid.addEventListener('click', (e) => _addShipToGrid(e, humanPlayer, opponentPlayer), true);

    rotateBtn.addEventListener('click', _rotateNextShip);
  }

  function attachAttackEvents(humanPlayer, opponentPlayer) {
    opponentDisplayGrid.addEventListener('mouseenter', (e) => _setAttackHighlight(e, true), true);;
    opponentDisplayGrid.addEventListener('mouseleave', (e) => _setAttackHighlight(e, false), true);
    opponentDisplayGrid.addEventListener('click', (e) => _attackOpponentCellOnGrid(e, humanPlayer, opponentPlayer), true);
  }

  function clearGridEvents() {
    _clearAllElementEvents(playerDisplayGrid);
    _clearAllElementEvents(opponentDisplayGrid);

    playerDisplayGrid = document.querySelector('#player .gameboard');
    opponentDisplayGrid = document.querySelector('#opponent .gameboard');
  }

  function _clearAllElementEvents(element) {
    const oldElement = element;
    const clearedElement = oldElement.cloneNode(true);
    oldElement.parentNode.replaceChild(clearedElement, oldElement);
  }


  function _addShipToGrid(e, player, opponent) {
    const target = e.target;
    if (target.classList.contains('board-cell')) {
      const playerGameboard = player.gameboard;
      const targetPos = _getTargetPos(target, playerGameboard);

      const isLegalPlacement = playerGameboard.setShip(shipLengths[0], targetPos, orie);

      if(isLegalPlacement) {
        gameController.completePlacementTurn(player, opponent, shipLengths[0]);
        shipLengths.shift()
        if(shipLengths.length <= 0) {
          clearGridEvents(playerDisplayGrid);
          gameController.beginAttackPhase(player, opponent);
        }
      }
    }
  }

  function _setShipHighlight(e, player, highlighted) {
    const target = e.target;

    if (target.classList.contains('board-cell')) {
      const length = shipLengths[0];

      const playerGameboard = player.gameboard;

      const size = playerGameboard.sideLength;
      const gridCellList = target.parentNode.children;
      const targetIndex =  Array.from(gridCellList).indexOf(target);

      let toHighlightCells = [];
      for(let i = 0; i < length; i++) {
        if(orie === 'horizontal') {
          const gridCellIndex = targetIndex + i;
          toHighlightCells.push(gridCellList[gridCellIndex]);
          if ((gridCellIndex % size) + 1 >= size) {
            break;
          }
        } else {
          const gridCellIndex = targetIndex + (i * size);
          toHighlightCells.push(gridCellList[gridCellIndex]);
          if (Math.floor(gridCellIndex / size) + 1 >= size) {
            break;
          }
        }
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

  function _rotateNextShip() {
    if (orie === 'horizontal') {
      orie = 'vertical';
    } else {
      orie = 'horizontal';
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