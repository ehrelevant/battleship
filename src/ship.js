const Ship = (length, pos, orie) => {
  const cells = Array(length).fill(true);

  const rets = {
    length,
    cells,
    pos,
    orie,
    hit(cellIndex) {
      rets.cells[cellIndex] = false;
    },
    isSunk() {
      return rets.cells.every(cell => (cell == false));
    },
  };

  return rets;
};

export default Ship;