import display from "./displayController";
import Player from "./gameObjects/player";

const gridSize = 10;


function start() {
  const player = Player('One')
  const computerAI = Player('CPU', true)

  const players = [player, computerAI]

  display.createBoards(gridSize);

  game(players)
}

function game(players) {
  let turn = 0;
  const playerCount = players.length;

  while(true) {
    const currentPlayer = players[(turn % playerCount)];
    break;
  }
}

start();