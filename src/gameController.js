import Gameboard from "./gameboard";

const gameboard = createGameboard();

function createGameboard() {
  let gameboard = new Gameboard();
  gameboard.initShips();
  return gameboard;
}

export { gameboard };
