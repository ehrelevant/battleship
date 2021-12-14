const Ship = (length) => {
  const rets = {
    cells: Array(length).fill(true),
    pos: null,
    rotation: null,
    hit(cellIndex) {
      this.cells[cellIndex] = false;
    },
    isSunk() {
      return rets.cells.every(cell => (cell == false));
    },
    setPos(headPos, rotation) {
      this.pos = headPos;
      this.rotation = rotation;
    }
  };

  return rets;
};

export default Ship;