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

  function generateCoordsForShipPlacement() {
    const coords = [generateRandomNumber(0, 9), generateRandomNumber(0, 9)];
    return coords;
  }

  function generateValidAttackCoords(
    enemyBoardsMissedAttacks,
    enemyBoardsHitAttacks
  ) {
    let coords = generateCoordsForShipPlacement().toString();

    // if the coords arent valid then generate new ones
    while (
      enemyBoardsMissedAttacks.includes(coords) ||
      enemyBoardsHitAttacks.includes(coords)
    ) {
      coords = generateCoordsForShipPlacement().toString();
    }

    // returns coords as a string
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

  function playComputerTurn(
    enemyBoardsRecieveAttack,
    enemyBoardsMissedAttacks,
    enemyBoardsHitAttacks
  ) {
    const coords = generateValidAttackCoords(
      enemyBoardsMissedAttacks,
      enemyBoardsHitAttacks
    );
    const atkResult = enemyBoardsRecieveAttack(coords);
    return { atkResult, coords };
  }

  return { gameboard, placeShipsRandomly, playComputerTurn };
};

export default newComputer;
