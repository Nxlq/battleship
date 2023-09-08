import GameboardFactory from "./gameboard-factory";

const newComputer = () => {
  const gameboard = GameboardFactory();

  function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function generateRandomDirection() {
    const number = generateRandomNumber(0, 1);
    return number === 0 ? "h" : "v";
  }

  function generateValidAttackCoords() {
    let coords = [generateRandomNumber(0, 9), generateRandomNumber(0, 9)];
    while (gameboard.missedAttacks.includes(coords.toString())) {
      coords = [generateRandomNumber(0, 9), generateRandomNumber(0, 9)];
    }
    return coords;
  }

  function generateCoordsForShipPlacement() {
    const coords = [generateRandomNumber(0, 9), generateRandomNumber(0, 9)];
    return coords;
  }

  function placeShipsRandomly() {
    const placements = {
      carrier: generateRandomDirection(),
      battleship: generateRandomDirection(),
      cruiser: generateRandomDirection(),
      submarine: generateRandomDirection(),
      destroyer: generateRandomDirection(),
    };

    // loop over placements obj and call setShip on each ship until all ships have been placed
    Object.entries(placements).forEach((entry) => {
      const [ship, direction] = entry;
      console.log(ship, direction);
      // attempt to set the ship on the board
      let hasShipBeenPlaced = gameboard.setShip(
        generateCoordsForShipPlacement(),
        ship,
        direction
      );
      // if the attempt was given invalid coords, keep attempting with new coords until it has been placed
      while (!hasShipBeenPlaced) {
        hasShipBeenPlaced = gameboard.setShip(
          generateCoordsForShipPlacement(),
          ship,
          direction
        );
      }
    });
  }

  return { gameboard, placeShipsRandomly };
};

export default newComputer;
