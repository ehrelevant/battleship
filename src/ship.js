const Ship = (length, pos, orientation) => {
  const cells = Array(length).fill(true);
  
  const rets = {
    cells,
    pos,
    orientation,
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