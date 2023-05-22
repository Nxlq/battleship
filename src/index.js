import newPlayer from "./player-factory";
import newComputer from "./computer-factory";
import {
  generateGameBoardCoords,
  btnStartGame,
  addBoardCoordEventListeners,
} from "./game-view";

const playerOne = newPlayer();
const computer = newComputer();

window.addEventListener("DOMContentLoaded", () => {
  generateGameBoardCoords();
  addBoardCoordEventListeners(
    playerOne.gameboard.receiveAttack,
    computer.gameboard.receiveAttack,
    playerOne.gameboard.toggleBoardState,
    computer.gameboard.toggleBoardState
  );

  computer.gameboard.toggleBoardState();
  playerOne.gameboard.setShip([2, 2], "battleship");
  playerOne.gameboard.setShip([3, 2], "carrier");
  playerOne.gameboard.setShip([4, 2], "cruiser");
  playerOne.gameboard.setShip([5, 2], "submarine");
  playerOne.gameboard.setShip([6, 2], "destroyer");

  computer.gameboard.setShip([0, 2], "battleship");
  computer.gameboard.setShip([1, 2], "carrier");
  computer.gameboard.setShip([2, 2], "cruiser");
  computer.gameboard.setShip([3, 2], "submarine");
  computer.gameboard.setShip([4, 2], "destroyer");
});

btnStartGame.addEventListener("click", () => {
  playerOne.gameboard.getBoard();
  computer.gameboard.getBoard();

  // console.log(playerOne.gameboard.receiveAttack([2, 2]));
});
