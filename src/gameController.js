import displayController from "./displayController";
import gameEvents from "./gameEvents";
import Player from "./gameObjects/player";

const gameController = (() => {
  const shipLengths = [5, 4, 3, 3, 2];

  function setupGame() {
    const humanPlayer = Player('User');
    const computerPlayer = Player('Computer', true);

    displayController.renderPlayerGameboard(humanPlayer.gameboard);
    displayController.renderOpponentGameboard(computerPlayer.gameboard);

    beginShipSetupPhase(humanPlayer, computerPlayer);
  }

  function beginShipSetupPhase(humanPlayer, computerPlayer) {
    gameEvents.attachAddShipEvents(humanPlayer, computerPlayer, 5);
  }

  function beginAttackPhase(humanPlayer, computerPlayer) {
    gameEvents.attachAttackEvents(humanPlayer, computerPlayer);
  }

  function completeGameTurn(player, opponent) {
    opponent.attackRandomCell(player);
    displayController.renderOpponentGameboard(opponent.gameboard);
    displayController.renderPlayerGameboard(player.gameboard);
  }

  function declareWinner(winningPlayer) {
    gameEvents.clearGridEvents()
    console.log(`${winningPlayer.name} wins!`);
  }

  const rets = {
    setupGame,
    beginShipSetupPhase,
    beginAttackPhase,
    completeGameTurn,
    declareWinner,
  };

  return rets;
})();

export default gameController;