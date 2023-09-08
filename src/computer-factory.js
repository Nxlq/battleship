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
  }

  function placeShipsRandomly() {
    const placements = {
      carrier: generateCoordsForShipPlacement(),
      battleship: generateCoordsForShipPlacement(),
      cruiser: generateCoordsForShipPlacement(),
      submarine: generateCoordsForShipPlacement(),
      destroyer: generateCoordsForShipPlacement(),
    };
  }

  return { gameboard, generateRandomDirection };
};

export default newComputer;
