const Ship = (length, pos, orie) => {
  const cells = Array(length).fill(true);

  function hit (cellIndex) {
    rets.cells[cellIndex] = false;
  }

  function isSunk() {
    return rets.cells.every(cell => (cell == false));
  }

  const rets = {
    length,
    cells,
    pos,
    orie,

    hit,
    isSunk,
  };

  return rets;
};

export default Ship;