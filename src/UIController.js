import { gameboard } from "./gameController";

function createUI() {
  const h1 = document.createElement("h1");
  h1.textContent = "Battleship";

  document.body.appendChild(h1);

  const gameUI = document.createElement("div");
  gameUI.classList.add("game-UI");
  gameUI.appendChild(createPlayerUI());

  document.body.appendChild(gameUI);
  placeShip(gameboard);
}

function createPlayerUI() {
  const playerUI = document.createElement("div");
  playerUI.classList.add("player-UI");

  const h2 = document.createElement("h2");
  h2.textContent = "Player 1";
  playerUI.appendChild(h2);

  playerUI.appendChild(createGameboard());

  return playerUI;
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

function placeShip(gameboard) {
  console.log("Begin placing ship");
  const ships = gameboard.ships;
  const shipBoard = document.querySelector(".ship-board");

  ships.forEach((ship) => {
    let [startX, endX, startY, endY] = ship.coordinate;
    for (let index = 0; index < ship.length; index++) {
      const grid = shipBoard.querySelector(
        `.grid-${startY * 10 + startX + index}`,
      );
      grid.classList.add(`ship-${ship.length}`);
      console.log("grid", grid);
    }
  });
  console.log("Ending placing ship");
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

function createBoard() {
  const board = document.createElement("div");
  board.classList.add("board");

  for (let index = 0; index < 100; index++) {
    const boardGrid = document.createElement("div");
    boardGrid.classList.add(`grid-${index}`, `board-grid`);
    board.appendChild(boardGrid);
  }

  return board;
}

export { createUI };
