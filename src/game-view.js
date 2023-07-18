export const btnStartGame = document.getElementById("btn-start-game");
export const gameBoards = document.querySelectorAll(".game-board");
export const shipPieces = document.querySelectorAll('[draggable="true"]');
const playerOneBoard = document.querySelector(".game-board.one");
const playerTwoBoard = document.querySelector(".game-board.two");
const gameContainerOne = document.querySelector(".game-container.one");
const gameContainerTwo = document.querySelector(".game-container.two");

const body = document.querySelector("body");

const shipPieceParts = {
  piecesToTheRight: null,
  shipLength: null,
};

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

function dragStart(e) {
  setTimeout(() => {
    this.classList.add("invisible");
  }, 0);
}

function dragEnd(e) {
  // this.classList.remove("invisible");
}

function setShipPieceParts(shipPiece) {
  const shipLength = shipPiece.parentElement.getAttribute("data-length");
  let piecesToTheRight = 0;

  // count the pieces to the right of the selected shipSquare
  let el = shipPiece;
  while (el.nextElementSibling) {
    console.log(el.nextElementSibling);
    el = el.nextElementSibling;
    piecesToTheRight += 1;
  }

  // return info needed to render the ship dragging over the board effect
  shipPieceParts.piecesToTheRight = piecesToTheRight;
  shipPieceParts.shipLength = shipLength;
}

shipPieces.forEach((shipPiece) => {
  console.log(shipPiece);
  shipPiece.addEventListener("dragstart", dragStart);
  shipPiece.addEventListener("dragend", dragEnd);
  shipPiece.addEventListener("mousedown", (e) => {
    console.log(e);
    setShipPieceParts(e.target);
  });
});

function renderShipDragShadow(shipPiecePartsObj) {}

function dragOver(e) {
  e.preventDefault();
  console.log("over");

  // render currently hovered el
  e.target.classList.add("hovered");

  // render siblings to the right
  let curSibling = e.target.nextElementSibling;
  for (let i = 0; i < shipPieceParts.piecesToTheRight; i += 1) {
    curSibling.classList.add("hovered");
    curSibling = curSibling.nextElementSibling;
  }

  // render sibling to the left
  const piecesToTheLeft =
    shipPieceParts.shipLength - (shipPieceParts.piecesToTheRight + 1);
  let prevSibling = e.target.previousElementSibling;
  for (let i = 0; i < piecesToTheLeft; i += 1) {
    prevSibling.classList.add("hovered");
    prevSibling = prevSibling.previousElementSibling;
  }
}

function dragEnter(e) {
  e.preventDefault();
  console.log("enter");
  console.log("TARGET", e.target);
  console.log(e.target.nextElementSibling);
}

function dragLeave(e) {
  console.log("leave");
  console.log("TARGET", e.target);

  e.target.classList.remove("hovered");
  // render siblings to the right
  let curSibling = e.target.nextElementSibling;
  for (let i = 0; i < shipPieceParts.piecesToTheRight; i += 1) {
    curSibling.classList.remove("hovered");
    curSibling = curSibling.nextElementSibling;
  }

  // render sibling to the left
  const piecesToTheLeft =
    shipPieceParts.shipLength - (shipPieceParts.piecesToTheRight + 1);
  let prevSibling = e.target.previousElementSibling;
  for (let i = 0; i < piecesToTheLeft; i += 1) {
    prevSibling.classList.remove("hovered");
    prevSibling = prevSibling.previousElementSibling;
  }
}

function dragDrop(e) {
  console.log("drop");
  this.classList.remove("hovered");
  this.classList.add("fill");
  console.log(e.target);

  // render siblings to the right
  let curSibling = e.target.nextElementSibling;
  for (let i = 0; i < shipPieceParts.piecesToTheRight; i += 1) {
    curSibling.classList.remove("hovered");
    curSibling.classList.add("fill");
    curSibling = curSibling.nextElementSibling;
  }

  // render sibling to the left
  const piecesToTheLeft =
    shipPieceParts.shipLength - (shipPieceParts.piecesToTheRight + 1);
  let prevSibling = e.target.previousElementSibling;
  for (let i = 0; i < piecesToTheLeft; i += 1) {
    prevSibling.classList.remove("hovered");
    prevSibling.classList.add("fill");
    prevSibling = prevSibling.previousElementSibling;
  }
}

export function addBoardDragListeners() {
  console.log(playerOneBoard.childNodes);
  playerOneBoard.childNodes.forEach((square) => {
    square.addEventListener("dragover", dragOver);
    square.addEventListener("dragenter", dragEnter);
    square.addEventListener("dragleave", dragLeave);
    square.addEventListener("drop", dragDrop);
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
