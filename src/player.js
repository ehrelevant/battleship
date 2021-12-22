import Gameboard from "./gameboard";

const gameboardSize = 10

const Player = (name, isAI=false) => {
  const gameboard = Gameboard(gameboardSize);

  function attackRandomCell(opponent) {
    const length = opponent.gameboard.board.length;

    let attackSuccess = false;
    while(!attackSuccess) {
      const x = Math.floor(Math.random() * length);
      const y = Math.floor(Math.random() * length);

      const pos = {x, y};
      attackSuccess = attackOpponent(opponent, pos);
    }
  }

  // Returns true if target position is a valid clell
  // Returns false otherwise
  function attackOpponent(opponent, pos) {
    if(!opponent.gameboard.wasCellChecked(pos)) {
      opponent.gameboard.recieveAttack(pos);
      return true;
    }
    return false;
  }

  const rets = {
    name,
    isAI,
    gameboard,
    attackOpponent
  };

  if (isAI) {
    rets.attackRandomCell = attackRandomCell;
  }

  return rets;
};

export default Player;