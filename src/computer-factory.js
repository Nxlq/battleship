import GameboardFactory from "./gameboard-factory";

const newComputer = () => {
  const gameboard = GameboardFactory();

  function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + 1);
  }

  function getValidCoords() {
    let coords = [generateRandomNumber(0, 9), generateRandomNumber(0, 9)];
    while (gameboard.missedAttacks.includes(coords.toString())) {
      coords = [generateRandomNumber(0, 9), generateRandomNumber(0, 9)];
    }
    return coords;
  }

  return { gameboard, getValidCoords };
};

export default newComputer;
