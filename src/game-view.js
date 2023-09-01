import { playerOne } from "./index";

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
  piecesToTheLeft: null,
  shipDirection: "h",
  shipType: null,
  curCoord: null,
  shipHeadCoord: null,
  isDragging: false,
  verticalHoverElArr: null,
  horizontalHoverElArr: null,
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

export function renderPlayerBoard(gameboardData) {
  const p1Grid = [...playerOneBoard.children];
  p1Grid.forEach((square) => {
    const squareValue = gameboardData.get(square.attributes.coords.value);
    if (squareValue === "water") renderWater(square);
    if (squareValue !== "water") renderShip(square);
  });
}

function dragStart(e) {
  console.log("start", e);
  [shipPieceParts.shipType] = e.target.classList;
  shipPieceParts.shipDirection = "h";
  setTimeout(() => {
    this.classList.add("invisible");
  }, 0);
}

function dragEnd(e) {
  // this.classList.remove("invisible");
}

// this function is called on mousedown on shipPiece below // sets obj property
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
  shipPieceParts.piecesToTheLeft =
    shipPieceParts.shipLength - (shipPieceParts.piecesToTheRight + 1);
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

function dragOver(e) {
  e.preventDefault();
  console.log("over");
  if (e.ctrlKey === true) {
    shipPieceParts.shipDirection = "v";
  } else {
    shipPieceParts.shipDirection = "h";
  }

  if (shipPieceParts.shipDirection === "h") {
    // remove render on previously hovered veritcal els
    shipPieceParts.verticalHoverElArr?.forEach((el) =>
      el.classList.remove("hovered")
    );

    // render currently hovered el
    e.target.classList.add("hovered");

    // arr to store the horizontal hovered els so that they can be undrendered when changing piece placement to vertical
    const horizontalElArr = [];
    horizontalElArr.push(e.target);

    // render siblings to the right
    let curSibling = e.target.nextElementSibling;
    for (let i = 0; i < shipPieceParts.piecesToTheRight; i += 1) {
      curSibling.classList.add("hovered");
      horizontalElArr.push(curSibling);
      console.log(horizontalElArr);
      curSibling = curSibling.nextElementSibling;
    }

    // render sibling to the left
    const piecesToTheLeft =
      shipPieceParts.shipLength - (shipPieceParts.piecesToTheRight + 1);
    let prevSibling = e.target.previousElementSibling;
    for (let i = 0; i < piecesToTheLeft; i += 1) {
      prevSibling.classList.add("hovered");
      horizontalElArr.push(prevSibling);
      prevSibling = prevSibling.previousElementSibling;
    }

    // store horizontal els for render removal on direction change to vertical for proper hover display
    shipPieceParts.horizontalHoverElArr = horizontalElArr;
  }

  if (shipPieceParts.shipDirection === "v") {
    // remove render on previously hovered horizontal els
    shipPieceParts.horizontalHoverElArr.forEach((el) =>
      el.classList.remove("hovered")
    );

    // arr to store the vertical hovered els so that they can be undrendered when changing piece placement to horizontal
    const verticalElArr = [];
    verticalElArr.push(e.target);
    // render currently hovered el
    e.target.classList.add("hovered");

    // render siblings above
    for (let i = 0; i < shipPieceParts.piecesToTheLeft; i += 1) {
      const square = document.querySelector(
        `[coords="${shipPieceParts.curCoord[0] - (i + 1)},${
          shipPieceParts.curCoord[1]
        }"]`
      );
      //! BUG here -> need to handle what happens when square doesnt have a value (for example if the user hovers vertically off the board)
      square.classList.add("hovered");
      verticalElArr.push(square);
    }

    // render siblings below
    for (let i = 0; i < shipPieceParts.piecesToTheRight; i += 1) {
      const square = document.querySelector(
        `[coords="${shipPieceParts.curCoord[0] + (i + 1)},${
          shipPieceParts.curCoord[1]
        }"]`
      );
      square.classList.add("hovered");
      verticalElArr.push(square);
    }
    shipPieceParts.verticalHoverElArr = verticalElArr;
    console.log(shipPieceParts.verticalHoverElArr);
  }
}

function dragEnter(e) {
  e.preventDefault();
  console.log("enter");
  console.log("TARGET", e.target);
  console.log(e.target.nextElementSibling);
  shipPieceParts.curCoord = this.getAttribute("coords")
    .split(",")
    .map((coord) => +coord);
}

function dragLeave(e) {
  console.log("leave");
  console.log("TARGET", e.target);
  console.log(shipPieceParts.curCoord);

  // this var is used for the vertical piece placement hover render since the shipPiece objs curcoord is updated on entering a square
  const targetCoords = e.target
    .getAttribute("coords")
    .split(",")
    .map((coord) => +coord);

  e.target.classList.remove("hovered");
  if (shipPieceParts.shipDirection === "h") {
    // remove render on siblings to the right
    let curSibling = e.target.nextElementSibling;
    for (let i = 0; i < shipPieceParts.piecesToTheRight; i += 1) {
      curSibling.classList.remove("hovered");
      curSibling = curSibling.nextElementSibling;
    }

    // remove render on sibling to the left
    const piecesToTheLeft =
      shipPieceParts.shipLength - (shipPieceParts.piecesToTheRight + 1);
    let prevSibling = e.target.previousElementSibling;
    for (let i = 0; i < piecesToTheLeft; i += 1) {
      prevSibling.classList.remove("hovered");
      prevSibling = prevSibling.previousElementSibling;
    }
  }

  if (shipPieceParts.shipDirection === "v") {
    // remove render on siblings above
    for (let i = 0; i < shipPieceParts.piecesToTheLeft; i += 1) {
      const square = document.querySelector(
        `[coords="${targetCoords[0] - (i + 1)},${targetCoords[1]}"]`
      );
      square.classList.remove("hovered");
    }

    // remove render on siblings below
    for (let i = 0; i < shipPieceParts.piecesToTheRight; i += 1) {
      const square = document.querySelector(
        `[coords="${targetCoords[0] + (i + 1)},${targetCoords[1]}"]`
      );
      square.classList.remove("hovered");
    }
  }
}

// want to use piecesObj and gameboard method to set ship on the backend
function dragDrop(e) {
  console.log("drop");
  this.classList.remove("hovered");
  this.classList.add("fill");
  // calculates coord location of the ship head and sets it in the shipsPiecesOBJ so we can pass it into the set ship function on the backend, that way we dont have to refactor the gameboards method
  shipPieceParts.shipHeadCoord =
    shipPieceParts.shipDirection === "h"
      ? [
          shipPieceParts.curCoord[0],
          shipPieceParts.curCoord[1] - shipPieceParts.piecesToTheLeft,
        ]
      : [
          shipPieceParts.curCoord[0] - shipPieceParts.piecesToTheLeft,
          shipPieceParts.curCoord[1],
        ];
  console.log(shipPieceParts.shipHeadCoord);
  console.log(e.target);
  console.log(shipPieceParts);

  playerOne.gameboard.setShip(
    shipPieceParts.shipHeadCoord,
    shipPieceParts.shipType,
    shipPieceParts.shipDirection
  );

  renderPlayerBoard(playerOne.gameboard.getBoard());

  // ------- INSTEAD OF RENDERING BASED ON DOM WE SHOULD RENDER BASED ON THE GAMEBOARDS BACKEND ------- LIKE ABOVE
  // // render siblings to the right
  // let curSibling = e.target.nextElementSibling;
  // for (let i = 0; i < shipPieceParts.piecesToTheRight; i += 1) {
  //   curSibling.classList.remove("hovered");
  //   curSibling.classList.add("fill");
  //   // curSibling.classList.add("");
  //   curSibling = curSibling.nextElementSibling;
  // }

  // // render sibling to the left
  // const piecesToTheLeft =
  //   shipPieceParts.shipLength - (shipPieceParts.piecesToTheRight + 1);
  // let prevSibling = e.target.previousElementSibling;
  // for (let i = 0; i < piecesToTheLeft; i += 1) {
  //   prevSibling.classList.remove("hovered");
  //   prevSibling.classList.add("fill");
  //   prevSibling = prevSibling.previousElementSibling;
  // }
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
