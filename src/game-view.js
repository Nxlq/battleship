const btnStartGame = document.getElementById("btn-start-game");

function generateGameBoardCoords() {
  const gameBoards = document.querySelectorAll(".game-board");

  gameBoards.forEach((gameBoard) => {
    let y = 0;
    let x = 0;
    const grid = [...gameBoard.children];
    grid.forEach((gridSquare) => {
      if (x > 9) {
        x = 0;
        y += 1;
      }

      gridSquare.setAttribute("coords", `${y}, ${x}`);
      x += 1;
    });
  });
}

export { generateGameBoardCoords, btnStartGame };
