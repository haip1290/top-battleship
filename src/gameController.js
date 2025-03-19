import Gameboard from "./gameboard";
import Player from "./player";

let player;
let computer;
let currentPlayer;

init();

function init() {
  player = new Player("human");
  player.gameboard.initShips();
  computer = new Player("computer");
  computer.gameboard.initShips();

  currentPlayer = player;
}

function switchPlayer() {
  currentPlayer = currentPlayer.type === "human" ? computer : player;
}

export { player, computer, currentPlayer, init, switchPlayer };
