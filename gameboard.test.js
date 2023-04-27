import GameboardFactory from "./src/gameboard-factory";

test("gameboard should place ships at specific coordinates HORIZONTALLY by calling the setShip method", () => {
  const gameboard = GameboardFactory();
  gameboard.setShip([0, 0], "carrier");

  const mockBoard = new Map([]);
  for (let i = 0; i < 10; i += 1) {
    for (let j = 0; j < 10; j += 1) {
      mockBoard.set([i, j].toString(), "water");
    }
  }
  for (let i = 0; i < 5; i += 1) {
    mockBoard.set(`0,${i}`, "carrier");
  }

  expect(gameboard.getBoard()).toEqual(mockBoard);
});

test("gameboard should be able to place ships at specific coordinates VERTICALLY by calling the setShip method and passing in a third argument", () => {
  const gameboard = GameboardFactory();
  gameboard.setShip([0, 0], "carrier", "v");

  const mockBoard = new Map([]);
  for (let i = 0; i < 10; i += 1) {
    for (let j = 0; j < 10; j += 1) {
      mockBoard.set([i, j].toString(), "water");
    }
  }
  for (let i = 0; i < 5; i += 1) {
    mockBoard.set(`${i},0`, "carrier");
  }

  expect(gameboard.getBoard()).toEqual(mockBoard);
});
