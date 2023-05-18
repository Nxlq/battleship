import newPlayer from "./player-factory";
import newComputer from "./computer-factory";
import { generateGameBoardCoords, btnStartGame } from "./game-view";

const playerOne = newPlayer();
const computer = newComputer();

btnStartGame.addEventListener("click", () => {
  generateGameBoardCoords();
});
