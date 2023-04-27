import Ship from "./ship-factory";

const GameboardFactory = () => {
  const ships = {
    carrier: Ship(5),
    battleship: Ship(4),
    cruiser: Ship(3),
    submarine: Ship(3),
    destroyer: Ship(2),
  };

  const board = new Map([]);

  for (let i = 0; i < 10; i += 1) {
    for (let j = 0; j < 10; j += 1) {
      board.set([i, j].toString(), "water");
    }
  }

  const setShip = (coord, ship, direction = "h") => {
    // check if coordinates are valid, throw error if not
    if (!checkIfValidCoords(coord, ship, direction))
      return console.error("invalid placement position");

    const shipLength = ships[ship].length;

    for (let i = 0; i < shipLength; i += 1) {
      const coordsToSet =
        direction === "h" ? [coord[0], coord[1] + i] : [coord[0] + i, coord[1]];

      board.set(coordsToSet.toString(), ship);
    }
  };

  const getBoard = () => {
    console.log(board);
    return board;
  };

  const logShips = () => {
    console.log(ships);
  };

  function checkIfValidCoords(coord, ship, direction) {
    const shipLength = ships[ship].length;
    const coordsToCheck =
      direction === "h"
        ? [coord[0], coord[1] + shipLength]
        : [coord[0] + shipLength, coord[1]];

    // if the final ship coordinates are within the gameboard range return true
    if (
      coordsToCheck[0] >= 0 &&
      coordsToCheck[0] <= 9 &&
      coordsToCheck[1] >= 0 &&
      coordsToCheck[1] <= 9
    ) {
      return true;
    }
    return false;
  }

  return { getBoard, setShip, logShips };
};

// GameboardFactory().getBoard();
// GameboardFactory().logShips();
// GameboardFactory().setShip([2, 3], "carrier");

export default GameboardFactory;
