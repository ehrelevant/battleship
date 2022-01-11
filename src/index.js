import display from "./displayController";
import Player from "./gameObjects/player";
import Gameboard from "./gameObjects/gameboard";

let players = undefined;

function start() {
  const player = Player('One')
  const computerAI = Player('CPU', true)

  players = [player, computerAI];
  computerSetup();
  playerSetup();
}

function playerSetup() {
  const playerGameboard = players[0].gameboard;

  display.renderPlayerBoard(playerGameboard);
}

function computerSetup() {
  const opponentGameboard = players[1].gameboard;

  opponentGameboard.scrambleShips()
  display.renderOpponentBoard(opponentGameboard);
}

function game() {
  let turn = 0;
  const playerCount = players.length;

  console.log('GAME STARTED');

  while(true) {
    const currentPlayer = players[(turn % playerCount)];
    break;
  }
}

start();

export {game};