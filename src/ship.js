const Ship = (length, pos, orie) => {
  const cells = Array(length).fill(true);

  const rets = {
    length,
    cells,
    pos,
    orie,
    hit(cellIndex) {
      this.cells[cellIndex] = false;
    },
    isSunk() {
      return rets.cells.every(cell => (cell == false));
    },
  };

  return rets;
};

export default Ship;