import GameboardFactory from "./gameboard-factory";

const newPlayer = () => {
  // let isTurn = false;
  const gameboard = GameboardFactory();

  // const toggleTurn = function () {
  //   isTurn = isTurn !== true;
  // };

  // const logTurn = function () {
  //   console.log(isTurn);
  // };

  return { gameboard };
};

export default newPlayer;
