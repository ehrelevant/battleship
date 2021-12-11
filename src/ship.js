const Ship = (length) => {
  const rets = {
    length,
    cells: Array(10).fill(true),
    rotation: 'vertical',
    hit() {
      // Hit Code Here
    },
    isSunk() {
      // Check if Ship is Sunken code here
    }
  };

  return rets;
}

export default Ship;