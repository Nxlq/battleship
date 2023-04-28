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

test("setShip method should not allow for ships to be placed at coordinates where the ship wont fit within the gameboard", () => {
  const gameboard = GameboardFactory();
  expect(gameboard.setShip([0, 8], "carrier")).toBe(
    console.error("invalid placement position")
  );
});

test("gameboard's receiveAttack method should increase a ship's hitcount if the coords given to it land on a ship", () => {
  const gameboard = GameboardFactory();
  gameboard.setShip([0, 0], "carrier");
  gameboard.receiveAttack([0, 0]);
  gameboard.receiveAttack([0, 1]);
  expect(gameboard.getShipHitcount("carrier")).toBe(2);
});

test("gameboard's receiveAttack method should record the coordinates into a missed shots array if the shot landed on a water coordinate", () => {
  const gameboard = GameboardFactory();
  gameboard.receiveAttack([3, 4]);
  gameboard.receiveAttack([1, 2]);
  expect(gameboard.missedAttacks).toEqual([
    [3, 4],
    [1, 2],
  ]);
});

test("gameboard should be able to report if all of its ships have been sunk", () => {
  const gameboard = GameboardFactory();
  expect(gameboard.hasShipsAlive).toBe(false);
});