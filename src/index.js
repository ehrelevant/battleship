import display from "./displayController";
import Player from "./gameObjects/player";
import { disableBoards } from "./displayController";

let players = undefined;

function start() {
  const player = Player('Player');
  const computerAI = Player('CPU', true);

  players = [player, computerAI];
  computerSetup();
  playerSetup();
}

function playerSetup() {
  const player = players[0];

  display.renderPlayerBoard(player);
}

function computerSetup() {
  const opponent = players[1];

  opponent.gameboard.scrambleShips()
  display.renderOpponentBoard(opponent);
}


function game() {
  const opponent = players[1];
  display.renderOpponentBoard(opponent);
}

function gamePlayerTurn(evt) {
  const player = players[0];
  const opponent = players[1];

  const gameboard = player.gameboard;
  const size = gameboard.sideLength;

  const target = evt.target;
  if (target.classList.contains('board-cell')) {
    const gridCells = target.parentNode.children;
    const targetIndex =  Array.from(gridCells).indexOf(target);

    const targetRow = Math.floor(targetIndex / size);
    const targetCol = targetIndex % size;

    let legalMove = false;
    legalMove = player.attackOpponent(opponent, {x:targetCol, y:targetRow});
    if (!legalMove) {
      return false;
    }

    display.renderOpponentBoard(opponent);
    gameOpponentTurn();
  }
}

function gameOpponentTurn() {
  const player = players[0];
  const opponent = players[1];

  // Currently looping to infinity
  opponent.attackRandomCell(player);
  display.renderPlayerBoard(player);
}

function determineWinner() {
  const player = players[0];
  const opponent = players[1];

  const playerGameboard = player.gameboard;

  if (playerGameboard.areAllShipsSunk()) {
    declareWinner(opponent);
  } else {
    declareWinner(player);
  }

  disableBoards(players);
}

function declareWinner(player) {
  console.log(`${player.name} wins!`);
}

start();

export { game, gamePlayerTurn, determineWinner };