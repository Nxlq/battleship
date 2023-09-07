import newPlayer from "./player-factory";
import newComputer from "./computer-factory";
import {
  generateGameBoardCoords,
  btnStartGame,
  addBoardCoordEventListeners,
  addDragListeners,
  renderPlayerBoard,
  renderPlayerOneAttackable,
  renderPlayerTwoAttackable,
  gameBoards,
  shipPieces,
} from "./game-view";

export const playerOne = newPlayer();
const playerTwo = newComputer();

function renderActiveTurn() {
  if (playerOne.gameboard.isBoardActive()) return renderPlayerOneAttackable();
  if (playerTwo.gameboard.isBoardActive()) return renderPlayerTwoAttackable();
  return "error neither board is active?";
}

window.addEventListener("DOMContentLoaded", () => {
  generateGameBoardCoords();
  addDragListeners();
  // addBoardCoordEventListeners(
  //   playerOne.gameboard.receiveAttack,
  //   playerTwo.gameboard.receiveAttack,
  //   playerOne.gameboard.toggleBoardState,
  //   playerTwo.gameboard.toggleBoardState
  // );

  // playerTwo.gameboard.toggleBoardState();
  // playerOne.gameboard.setShip([2, 2], "battleship");
  // playerOne.gameboard.setShip([3, 2], "carrier");
  // playerOne.gameboard.setShip([4, 2], "cruiser");
  // playerOne.gameboard.setShip([5, 2], "submarine");
  // playerOne.gameboard.setShip([6, 2], "destroyer");

  // playerTwo.gameboard.setShip([0, 2], "battleship");
  // playerTwo.gameboard.setShip([1, 2], "carrier");
  // playerTwo.gameboard.setShip([2, 2], "cruiser");
  // playerTwo.gameboard.setShip([3, 2], "submarine");
  // playerTwo.gameboard.setShip([4, 2], "destroyer");

  // renderPlayerShips(playerOne.gameboard.getBoard());
  // renderActiveTurn();
});

btnStartGame.addEventListener("click", () => {
  playerOne.gameboard.getBoard();
  playerTwo.gameboard.getBoard();
  // console.log(playerOne.gameboard.receiveAttack([2, 2]));
});

gameBoards.forEach((board) => {
  board.addEventListener("click", renderActiveTurn);
});
