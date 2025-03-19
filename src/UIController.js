import {
  player,
  computer,
  currentPlayer,
  switchPlayer,
  init,
} from "./gameController";

function createHeading() {
  const h1 = document.createElement("h1");
  h1.textContent = "Battleship";

  document.body.appendChild(h1);
}

function createUI() {
  const gameUI = document.createElement("div");
  gameUI.classList.add("game-UI");

  const playerUI = createPlayerUI(player);
  const computerUI = createComputerUI(computer);

  gameUI.appendChild(playerUI);
  gameUI.appendChild(computerUI);

  document.body.appendChild(gameUI);
  placeShip(player.gameboard, playerUI);
  placeShip(computer.gameboard, computerUI);

  addHitBoardListener(computer.gameboard, playerUI, computerUI);
}

function createPlayerUI(player) {
  const playerUI = document.createElement("div");
  playerUI.classList.add("player-UI");
  playerUI.dataset.playerType = player.type;

  const h2 = document.createElement("h2");
  h2.textContent = "Player";
  playerUI.appendChild(h2);

  playerUI.appendChild(createGameboard());

  return playerUI;
}

function createComputerUI(computer) {
  const computerUI = document.createElement("div");
  computerUI.classList.add("computer-UI");
  computerUI.dataset.playerType = computer.type;

  const h2 = document.createElement("h2");
  h2.textContent = "Computer";
  computerUI.appendChild(h2);

  computerUI.appendChild(createGameboard());

  return computerUI;
}

function createGameboard() {
  const gameboard = document.createElement("div");
  gameboard.classList.add("gameboard");

  gameboard.appendChild(createShipBoard());
  gameboard.appendChild(createHitBoard());

  return gameboard;
}

function createShipBoard() {
  const shipBoard = document.createElement("div");
  shipBoard.classList.add("ship-board");

  const h3 = document.createElement("h3");
  h3.textContent = "Ship Board";
  shipBoard.appendChild(h3);

  shipBoard.appendChild(createBoard());
  return shipBoard;
}

function placeShip(gameboard, UIContainer) {
  const ships = gameboard.ships;
  const shipBoard = UIContainer.querySelector(".ship-board");

  ships.forEach((ship) => {
    let [startX, endX, startY, endY] = ship.coordinate;
    for (let index = 0; index < ship.length; index++) {
      let grid;
      if (startY === endY) {
        grid = shipBoard.querySelector(`.grid-${startX + index}-${startY}`);
      } else {
        grid = shipBoard.querySelector(`.grid-${startX}-${startY + index}`);
      }

      grid.classList.add(`ship-${ship.length}`);
      grid.dataset.ship = true;
    }
  });
}

function createHitBoard() {
  const hitBoard = document.createElement("div");
  hitBoard.classList.add("hit-board");

  const h3 = document.createElement("h3");
  h3.textContent = "Hit Board";
  hitBoard.appendChild(h3);

  hitBoard.appendChild(createBoard());
  return hitBoard;
}

function addHitBoardListener(gameboard, hitBoardUI, shipBoardUI) {
  const hitBoard = hitBoardUI.querySelector(".hit-board");
  const hitGrids = hitBoard.querySelectorAll(".board-grid");

  const shipBoard = shipBoardUI.querySelector(".ship-board");
  const shipGrids = shipBoard.querySelectorAll(".board-grid");

  hitGrids.forEach((grid, index) => {
    grid.addEventListener("click", () => {
      const x = Number(grid.classList[0].split("-")[1]);
      const y = Number(grid.classList[0].split("-")[2]);
      handleAttack(gameboard, [x, y], grid, shipGrids[index]);
    });
  });
}

function handleAttack(gameboard, coordinate, hitGrid, shipGrid) {
  const ship = gameboard.receiveAttack(coordinate);
  if (ship) {
    updateGridUI(hitGrid, true);
    updateGridUI(shipGrid, true);
  } else {
    updateGridUI(hitGrid);
    updateGridUI(shipGrid);
  }
  if (gameboard.areAllSunked()) {
    gameOver();
  } else {
    switchPlayer();
    if (currentPlayer.type === "computer") {
      computerTurn();
    }
  }
}

function updateGridUI(grid, hit = false) {
  if (hit) {
    grid.textContent = "X";
    grid.classList.add("hit");
  } else {
    grid.textContent = "O";
    grid.classList.add("miss");
  }
}

function computerTurn() {
  const [x, y] = computer.gameboard.randomAttack();

  const playerUI = document.querySelector(".player-UI");
  const shipBoard = playerUI.querySelector(".ship-board");
  const shipGrids = shipBoard.querySelectorAll(".board-grid");

  const computerUI = document.querySelector(".computer-UI");
  const hitBoard = computerUI.querySelector(".hit-board");
  const hitGrids = hitBoard.querySelectorAll(".board-grid");

  handleAttack(
    player.gameboard,
    [x, y],
    hitGrids[y * 10 + x],
    shipGrids[y * 10 + x],
  );
}

function gameOver() {
  console.log("Game Over");
  const winner = currentPlayer.type === "human" ? "Player" : "Computer";
  alert(`${winner} wins!`);
  resetGame();
}

function createBoard() {
  const board = document.createElement("div");
  board.classList.add("board");

  for (let index = 0; index < 100; index++) {
    const boardGrid = document.createElement("div");
    boardGrid.classList.add(
      `grid-${index % 10}-${Math.floor(index / 10)}`,
      `board-grid`,
    );
    board.appendChild(boardGrid);
  }

  return board;
}

function resetGame() {
  init();
  clearGameUI();
  createHeading;
  createUI();
}

function clearGameUI() {
  const gameUI = document.querySelector(".game-UI");
  gameUI.innerHTML = "";
}

export { createUI, createHeading };
