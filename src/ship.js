const Ship = (length) => {
  const rets = {
    cells: Array(length).fill(true),
    rotation: 'vertical',
    hit(cellIndex) {
      this.cells[cellIndex] = false;
    },
    isSunk() {
      return this.cells.every(cell => (cell == false));
    }
  };

  return rets;
};

export default Ship;