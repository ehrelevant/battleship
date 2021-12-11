import Ship from '../ship.js';

test('Ship has cells equal to length', () => {
  const ship = Ship(4);

  // toMatchObject() is used so that the object's functions are skipped
  expect(ship).toMatchObject({
    cells: [true, true, true, true],
    rotation: 'vertical',
  });
});

test('Hit() sets a ship cell to false', () => {
  const ship = Ship(5);
  ship.hit(0);
  ship.hit(2);

  expect(ship).toMatchObject({
    cells: [false, true, false, true, true],
    rotation: 'vertical',
  });
});

test('Checks if ship has been sunken', () => {
  const ship = Ship(3);
  ship.hit(0);
  ship.hit(1);
  ship.hit(2);

  expect(ship.isSunk()).toEqual(true);
});

