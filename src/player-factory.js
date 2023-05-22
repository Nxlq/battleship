import GameboardFactory from "./gameboard-factory";

const newPlayer = () => {
  const gameboard = GameboardFactory();

  return { gameboard };
};

export default newPlayer;
