import Ship from "./src/ship-factory";

test("Hit function should increment the ships hit count by 1", () => {
  const testShip = Ship(5);
  const beforeHitCount = testShip.getHitCount();
  testShip.hit();
  const afterHitCount = testShip.getHitCount();
  expect(afterHitCount).toBe(beforeHitCount + 1);
});

test("checkIfSunk function returns false if the ship has NOT been sunk", () => {
  const testShip = Ship(5);
  expect(testShip.checkIfSunk()).toBe(false);
});

test("checkIfSunk function returns true if the ship HAS BEEN sunk", () => {
  const testShip = Ship(1);
  testShip.hit();
  expect(testShip.checkIfSunk()).toBe(true);
});
