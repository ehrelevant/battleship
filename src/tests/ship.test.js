import Ship from '../gameObjects/ship.js';

test('Ship has cells equal to length', () => {
  const ship = Ship(4, {x: 0, y: 0}, 'horizontal');

  expect(ship).toMatchObject({
    cells: [true, true, true, true]
  });
});

test('Hit() sets a ship cell to false', () => {
  const ship = Ship(5, {x: 0, y: 0}, 'horizontal');
  ship.hit(0);
  ship.hit(2);

  expect(ship).toMatchObject({
    cells: [false, true, false, true, true]
  });
});

test('Checks if ship has been sunken', () => {
  const ship = Ship(3, {x: 0, y: 0}, 'horizontal');
  ship.hit(0);
  ship.hit(1);
  ship.hit(2);

  expect(ship.isSunk()).toEqual(true);
});

test('Ship has a position and rotation', () => {
  const ship = Ship(5, {x: 3, y: 4}, 'vertical');

  expect(ship).toMatchObject({
    pos: {x: 3, y: 4},
    orie: 'vertical'
  });
});

