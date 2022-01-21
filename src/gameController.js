import displayController from "./displayController";
import gameEvents from "./gameEvents";
import Player from "./gameObjects/player";

const gameController = (() => {
  function setupGame() {
    const humanPlayer = Player('User');
    const computerPlayer = Player('Computer', true);

    displayController.renderPlayerGameboard(humanPlayer.gameboard);
    displayController.renderOpponentGameboard(computerPlayer.gameboard);

    _beginShipSetupPhase(humanPlayer, computerPlayer);
  }

  function _beginShipSetupPhase(humanPlayer, computerPlayer) {
    gameEvents.attachAddShipEvents(humanPlayer, computerPlayer);
  }

  function beginAttackPhase(humanPlayer, computerPlayer) {
    gameEvents.attachAttackEvents(humanPlayer, computerPlayer);
  }

  function completeGameTurn(player, opponent) {
    opponent.attackRandomCell(player);
    displayController.renderPlayerGameboard(player.gameboard);
    displayController.renderOpponentGameboard(opponent.gameboard);
  }

  function completePlacementTurn(player, opponent, length) {
    opponent.gameboard.placeShipRandomly(length);
    displayController.renderPlayerGameboard(player.gameboard);
    displayController.renderOpponentGameboard(opponent.gameboard);
  }

  function declareWinner(winningPlayer) {
    gameEvents.clearGridEvents();
    displayController.editOutputText(`All ships sunk, ${winningPlayer.name} wins!`)
  }

  const rets = {
    setupGame,
    beginAttackPhase,
    completePlacementTurn,
    completeGameTurn,
    declareWinner,
  };

  return rets;
})();

export default gameController;