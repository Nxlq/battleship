import Ship from "./ship-factory";

const GameboardFactory = () => {
  let canBoardBeAttacked = false;
  const hitAttacks = [];
  const missedAttacks = [];

  function toggleBoardState() {
    canBoardBeAttacked = canBoardBeAttacked !== true;
  }

  const isBoardActive = () => {
    console.log(canBoardBeAttacked);
    return canBoardBeAttacked;
  };

  const ships = {
    carrier: Ship(5),
    battleship: Ship(4),
    cruiser: Ship(3),
    submarine: Ship(3),
    destroyer: Ship(2),
  };

  let shipsPlaced = 0;

  function incrementShipsPlaced() {
    shipsPlaced += 1;
  }

  function getShipsPlacedCount() {
    return shipsPlaced;
  }

  const board = new Map([]);

  for (let i = 0; i < 10; i += 1) {
    for (let j = 0; j < 10; j += 1) {
      board.set([i, j].toString(), "water");
    }
  }

  function getShipHitcount(ship) {
    return ships[ship].getHitCount();
  }

  function checkIfValidCoords(coord, ship, direction) {
    const shipLength = ships[ship].length;
    const coordsToCheck =
      direction === "h"
        ? [coord[0], coord[1] + (shipLength - 1)]
        : [coord[0] + (shipLength - 1), coord[1]];

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

  const setShip = (coord, ship, direction = "h") => {
    // check if coordinates are valid, throw error if not
    console.log({ coord, ship, direction });
    if (!checkIfValidCoords(coord, ship, direction))
      return console.error("invalid placement position");

    const shipLength = ships[ship].length;

    // place ship along coordinates
    for (let i = 0; i < shipLength; i += 1) {
      const coordsToSet =
        direction === "h" ? [coord[0], coord[1] + i] : [coord[0] + i, coord[1]];
      console.log({ coord, coordsToSet });

      // !BUG HERE , DOES NOT CHECK ALL COORDS BEFORE ALTERING THE GAME BOARD STATE, NEED TO REFACTOR THIS LATER WHEN IMPLEMENTING DYNAMIC SHIP PLACEMENT VIA DOM INTERACTION
      if (board.get(coordsToSet.toString()) !== "water")
        return console.error(
          "invalid coords: cannot place ships on top of each other"
        );

      board.set(coordsToSet.toString(), ship);
      incrementShipsPlaced();
      console.log(getShipsPlacedCount());
    }
    return true;
  };

  const getBoard = () => {
    console.log(board);
    return board;
  };

  const logShips = () => {
    console.log(ships);
  };

  const hasShipsAlive = () => {
    const shipsValues = Object.values(ships);
    const aliveShips = shipsValues.filter((ship) => !ship.checkIfSunk());
    return aliveShips.length !== 0;
  };

  const receiveAttack = (coord) => {
    if (!canBoardBeAttacked) {
      console.log("board can not be currently attacked");
      return false;
    }
    const target = coord.toString();
    if (hitAttacks.includes(target)) return false;
    if (missedAttacks.includes(target)) return false;

    // if target is a ship, call targetted ships hit method and return
    if (board.get(target) !== "water") {
      ships[board.get(target)].hit();
      hitAttacks.push(target);

      const shouldEndGame = !hasShipsAlive();
      if (shouldEndGame) return "game over";
      toggleBoardState();

      return board.get(target);
    }

    // if the target is water
    missedAttacks.push(coord.toString());
    toggleBoardState();

    return board.get(target);
  };

  return {
    getBoard,
    setShip,
    logShips,
    receiveAttack,
    getShipHitcount,
    missedAttacks,
    hasShipsAlive,
    toggleBoardState,
    isBoardActive,
    getShipsPlacedCount,
  };
};

export default GameboardFactory;
