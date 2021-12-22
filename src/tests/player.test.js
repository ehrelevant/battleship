import Player from '../player.js';

test('Player is created', () => {
  const player = Player('player');

  expect(player).toMatchObject({
    name: 'player',
    isAI: false,
    gameboard: {}
  });
});

test('"AI" is created', () => {
  const computerAI = Player('AI', true);

  expect(computerAI).toMatchObject({
    name: 'AI',
    isAI: true,
    gameboard: {}
  });
});

test('Player can attack other players', () => {
  const player = Player('player');
  const computerAI = Player('AI', true);

  player.attackOpponent(computerAI, {x: 0, y: 0});

  expect(computerAI.gameboard.board[0][0].isChecked).toEqual(true);
});

test('AI attacks a random open cell of the opponent', () => {
  const player = Player('player');
  const computerAI = Player('AI', true);

  computerAI.attackRandomCell(player);

  const comparison = player.gameboard.board.some((row) => {
    return row.some((cell) => {
      return cell.isChecked === true;
    });
  });

  expect(comparison).toEqual(true);
});

test('Player cannot attack previous cells', () => {
  const player = Player('player');
  const computerAI = Player('AI', true);

  player.attackOpponent(computerAI, {x: 0, y: 0});
  const result = player.attackOpponent(computerAI, {x: 0, y: 0});

  expect(result).toEqual(false);
});