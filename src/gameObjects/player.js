import Gameboard from "./gameboard";

const gameboardSize = 10

const Player = (name, isAI=false) => {
  let isWinner = false;
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

  // Returns true if target position is a valid cell
  // Returns false otherwise
  function attackOpponent(opponent, pos) {
    if(!opponent.gameboard.wasCellChecked(pos)) {
      const result = opponent.gameboard.recieveAttack(pos);
      if(result) {
        setWinner()
      }

      return true;
    }
    return false;
  }

  function setWinner() {
    rets.isWinner = true;
  }

  const rets = {
    name,
    isAI,
    gameboard,
    attackOpponent,
    isWinner,
  };

  if (isAI) {
    rets.attackRandomCell = attackRandomCell;
  }

  return rets;
};

export default Player;