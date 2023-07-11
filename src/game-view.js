export const btnStartGame = document.getElementById("btn-start-game");
export const gameBoards = document.querySelectorAll(".game-board");
const playerOneBoard = document.querySelector(".game-board.one");
const playerTwoBoard = document.querySelector(".game-board.two");
const gameContainerOne = document.querySelector(".game-container.one");
const gameContainerTwo = document.querySelector(".game-container.two");

const body = document.querySelector("body");

export function generateGameBoardCoords() {
  gameBoards.forEach((gameBoard) => {
    const grid = [...gameBoard.children];
    let y = 0;
    let x = 0;
    grid.forEach((gridSquare) => {
      if (x > 9) {
        x = 0;
        y += 1;
      }

      gridSquare.setAttribute("coords", `${y},${x}`);
      x += 1;
    });
  });
}

export function renderPlayerOneAttackable() {
  gameContainerOne.style.backgroundColor = "#9c0000";
  gameContainerTwo.style.backgroundColor = "black";
}

export function renderPlayerTwoAttackable() {
  gameContainerTwo.style.backgroundColor = "#9c0000";
  gameContainerOne.style.backgroundColor = "black";
}

function renderWater(targettedSquare) {
  targettedSquare.style.backgroundColor = "#34b1eb";
}

function renderShip(targettedSquare) {
  targettedSquare.style.backgroundColor = "#9c0000";
}

function renderX(targettedSquare) {
  const peg = document.createElement("div");
  peg.classList.add("marked");
  targettedSquare.appendChild(peg);
}

function renderEndScreen() {
  body.style.backgroundColor = "red";
}

export function renderPlayerShips(gameboardData) {
  const p1Grid = [...playerOneBoard.children];
  p1Grid.forEach((square) => {
    const squareValue = gameboardData.get(square.attributes.coords.value);
    if (squareValue === "water") renderWater(square);
    if (squareValue !== "water") renderShip(square);
  });
}

// !~ The functionality of this function should be split into specific event listeners for each board, should be refactored if desired cleaner code ~!
// breaks dry principles because of the handling of variables and forEach method -- if I was passionate for this project refactor is a must
export function addBoardCoordEventListeners(
  playerOneRecieveAttack,
  playerTwoRecieveAttack,
  playerOneToggleTurn,
  playerTwoToggleTurn
) {
  gameBoards.forEach((gameBoard) => {
    const grid = [...gameBoard.children];
    grid.forEach((gridSquare) =>
      gridSquare.addEventListener("click", (e) => {
        if (!e.target.classList.contains("coord-square")) return;
        const targettedCoords = e.target.attributes.coords.value;
        console.log(targettedCoords);

        if (e.target.parentElement.classList.contains("one")) {
          // if the attack is invalid then the receive attack function will return false and the turns should not be toggled
          // only if the attack is valid then toggle turns and continue game flow
          const result = playerOneRecieveAttack(targettedCoords);
          if (!result) return;
          if (result === "game over") renderEndScreen();
          renderX(e.target);
          playerTwoToggleTurn();
        } else {
          const result = playerTwoRecieveAttack(targettedCoords);
          if (!result) return;
          if (result === "water") renderWater(e.target);
          if (result !== "water") renderShip(e.target);
          if (result === "game over") renderEndScreen();
          playerOneToggleTurn();
        }
      })
    );
  });
}

// listens to click event, checks if the baord is active/if it the players turn, calls receive attack function if so, and do nothing if it the board isnt supposed to be active
